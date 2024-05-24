//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import EmptyState from "../../core/emptyState/EmptyState";
import Typography from "../../core/typography/Typography";

import { daysOfWeek, months } from "../calendar/Calendar";

import EventCard from "../cards/EventCard";

import { sortEvents } from "../../utility/utility";

const DetailsLayout = ({ data, calendars, editUser }) => {
  const { selectedDate } = useSelectedDateContext();

  const itemsForSelectedDay = data
    ? data.filter(
        (item) =>
          selectedDate.month === new Date(item.startTime).getMonth() &&
          selectedDate.year === new Date(item.startTime).getFullYear() &&
          selectedDate.date === new Date(item.startTime).getDate()
      )
    : [];

  const showBadge = (time) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const creationTime = new Date(time);

    return (
      (today.getFullYear() === creationTime.getFullYear() &&
        today.getMonth() === creationTime.getMonth() &&
        today.getDate() === creationTime.getDate()) ||
      (yesterday.getFullYear() === creationTime.getFullYear() &&
        yesterday.getMonth() === creationTime.getMonth() &&
        yesterday.getDate() === creationTime.getDate())
    );
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <Typography variant="subheading" color="primary" center>
        {`${daysOfWeek[selectedDate.weekday]}, ${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`}
      </Typography>
      <div className="flex flex-col gap-4">
        {sortEvents(itemsForSelectedDay).map((event) => (
          <Link key={event._id} to={`/event/${event._id}`}>
            <EventCard
              event={event.event}
              color={calendars.find((calendar) => calendar.user === event.user).color}
              tag={event.tag}
              startTime={new Date(event.startTime)}
              endTime={new Date(event.endTime)}
              badge={showBadge(event.creationTime)}
            />
          </Link>
        ))}
        {itemsForSelectedDay.length > 0 ? null : <EmptyState readOnly={!editUser} />}
      </div>
    </div>
  );
};

export default DetailsLayout;
