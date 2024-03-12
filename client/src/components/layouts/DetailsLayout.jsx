//Taylor Zweigle, 2024
import React, { useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import EmptyState from "../../core/emptyState/EmptyState";
import Typography from "../../core/typography/Typography";

import { daysOfWeek, months } from "../calendar/Calendar";

import EventCard from "../cards/EventCard";

import EventFormModal from "../modals/EventFormModal";

import { sortEvents } from "../../utility/utility";

import { getEvent } from "../../api/events";

const DetailsLayout = ({ data, calendars }) => {
  const { user } = useAuthContext();
  const { selectedDate } = useSelectedDateContext();

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
    if (!user) {
      return;
    }

    const res = await getEvent(event, user.token);

    setEventDetails(res.json);

    setEventModal(true);
  };

  return (
    <>
      <EventFormModal
        open={eventModal}
        type="Edit"
        eventDetails={eventDetails}
        selectedDate={selectedDate}
        onSaveClick={() => setEventModal(false)}
        onDeleteClick={() => setEventModal(false)}
        onCancelClick={() => setEventModal(false)}
      />
      <div className="flex flex-col gap-8 border-b border-slate-300 dark:border-slate-600 p-4 sm:p-8">
        <Typography variant="subheading" center>
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
