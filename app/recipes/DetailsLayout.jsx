//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import { useEventsContext } from "../hooks/useEventsContext";

import { daysOfWeek, months } from "../components/calendar/Calendar";
import EmptyState from "../components/emptyState/EmptyState";
import EventCard from "../components/card/EventCard";
import Typography from "../components/typography/Typography";

import CalendarEventModal from "./CalendarEventModal";

import { deleteEvent, getEvent } from "../api/events";

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

  const handleDeleteEvent = (event) => {
    deleteEvent(event);

    dispatch({ type: "DELETE_EVENT", payload: event });

    setEventModal(false);
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
          {itemsForSelectedDay.map((event) => (
            <EventCard
              key={event.id}
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
