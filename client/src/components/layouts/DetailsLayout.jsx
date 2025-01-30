//Taylor Zweigle, 2025
import React from "react";
import { Link } from "react-router-dom";

import { useCalendarsContext } from "../../hooks/useCalendarsContext";
import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import { getCalendarColor, isRecentlyAdded, sortEvents } from "../../utility/utility";

import EmptyState from "../../core/emptyState/EmptyState";
import Typography from "../../core/typography/Typography";

import { daysOfWeek, months } from "../calendar/Calendar";
import EventCard from "../cards/EventCard";

const DetailsLayout = ({ data }) => {
  const { calendars } = useCalendarsContext();
  const { selectedDate } = useSelectedDateContext();

  const itemsForSelectedDay = data
    ? data.filter(
        (item) =>
          selectedDate.month === new Date(item.startTime).getMonth() &&
          selectedDate.year === new Date(item.startTime).getFullYear() &&
          selectedDate.date === new Date(item.startTime).getDate()
      )
    : [];

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <Typography variant="subheading" color="primary" center>
        {`${daysOfWeek[selectedDate.weekday]}, ${months[selectedDate.month]} ${selectedDate.date}, ${
          selectedDate.year
        }`}
      </Typography>
      <div className="flex flex-col gap-4">
        {sortEvents(itemsForSelectedDay).map((event) => (
          <Link key={event._id} to={`/event/${event._id}`}>
            <EventCard
              event={event.event}
              color={getCalendarColor(calendars, event.user)}
              tag={event.tag}
              startTime={
                event.actualStartTime ? new Date(event.actualStartTime) : new Date(event.startTime)
              }
              endTime={event.actualEndTime ? new Date(event.actualEndTime) : new Date(event.endTime)}
              showStartDate={event.actualStartTime}
              showEndDate={event.actualEndTime}
              allDay={event.allDay}
              badge={isRecentlyAdded(event.creationTime)}
            />
          </Link>
        ))}
        {itemsForSelectedDay.length > 0 ? null : (
          <EmptyState type="Event" subtext={`Click "Add Event" to create a new event.`} />
        )}
      </div>
    </div>
  );
};

export default DetailsLayout;
