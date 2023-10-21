//Taylor Zweigle, 2023
"use client";

import React from "react";

import { daysOfWeek, months } from "../components/calendar/Calendar";
import EmptyState from "../components/emptyState/EmptyState";
import EventCard from "../components/card/EventCard";
import Typography from "../components/typography/Typography";

const DetailsLayout = ({ data, calendars, selectedDate }) => {
  const itemsForSelectedDay = data
    ? data.filter(
        (item) =>
          selectedDate.month === new Date(item.startTime).getMonth() &&
          selectedDate.year === new Date(item.startTime).getFullYear() &&
          selectedDate.date === new Date(item.startTime).getDate()
      )
    : [];

  return (
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
          />
        ))}
        {itemsForSelectedDay.length > 0 ? null : <EmptyState />}
      </div>
    </div>
  );
};

export default DetailsLayout;
