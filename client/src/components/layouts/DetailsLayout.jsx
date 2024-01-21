//Taylor Zweigle, 2024
import React, { useState } from "react";

import * as Actions from "../../actions";

import { useEventsContext } from "../../hooks/useEventsContext";

import EmptyState from "../../core/emptyState/EmptyState";
import Typography from "../../core/typography/Typography";

import { daysOfWeek, months } from "../calendar/Calendar";

import EventCard from "../cards/EventCard";

import CalendarEventModal from "../modals/CalendarEventModal";

import { sortEvents } from "../../utility/utility";

import { deleteEvent, getEvent } from "../../api/events";

const DetailsLayout = ({ data, calendars, selectedDate }) => {
  const { dispatch } = useEventsContext();

  const [eventModal, setEventModal] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  const itemsForSelectedDay = data
    ? data.filter(
        (item) =>
          selectedDate.month === new Date(item.startTime).getMonth() &&
          selectedDate.year === new Date(item.startTime).getFullYear() &&
          selectedDate.date === new Date(item.startTime).getDate()
      )
    : [];

  const handleEventCardClick = async (event) => {
    const res = await getEvent(event);

    setEventDetails(res);

    setEventModal(true);
  };

  const handleDeleteEvent = async (event) => {
    const json = await deleteEvent(event);

    if (json) {
      dispatch({ type: Actions.DELETE_EVENT, payload: json });

      setEventModal(false);
    }
  };

  return (
    <>
      <CalendarEventModal
        open={eventModal}
        eventDetails={eventDetails}
        onDeleteClick={(event) => handleDeleteEvent(event)}
        onCancelClick={() => setEventModal(false)}
      />
      <div className="flex flex-col gap-8 border-b border-slate-300 dark:border-slate-600 p-8">
        <Typography variant="subheading">
          {`${daysOfWeek[selectedDate.weekday]}, ${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`}
        </Typography>
        <div className="flex flex-col gap-4">
          {sortEvents(itemsForSelectedDay).map((event) => (
            <EventCard
              key={event._id}
              event={event.event}
              color={calendars.find((calendar) => calendar.user === event.user).color}
              tag={event.tag}
              startTime={new Date(event.startTime)}
              endTime={new Date(event.endTime)}
              onClick={() => handleEventCardClick(event)}
            />
          ))}
          {itemsForSelectedDay.length > 0 ? null : <EmptyState />}
        </div>
      </div>
    </>
  );
};

export default DetailsLayout;
