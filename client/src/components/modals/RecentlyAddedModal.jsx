//Taylor Zweigle, 2025
import React, { useState } from "react";

import { useCalendarsContext } from "../../hooks/useCalendarsContext";

import { getCalendarColor } from "../../utility/utility";

import EmptyState from "../../core/emptyState/EmptyState";
import Modal from "../../core/modal/Modal";
import Tab from "../../core/tabs/Tab";

import EventCard from "../cards/EventCard";
import TodoCard from "../cards/TodoCard";

const RecentlyAddedModal = ({ open, events, todos, onCancelClick }) => {
  const { calendars } = useCalendarsContext();

  const [selected, setSelected] = useState("Events");

  const showEndDate = (startTime, endTime) => {
    if (
      new Date(startTime).getDate() === new Date(endTime).getDate() &&
      new Date(startTime).getMonth() === new Date(endTime).getMonth() &&
      new Date(startTime).getFullYear() === new Date(endTime).getFullYear()
    ) {
      return false;
    } else {
      return endTime;
    }
  };

  return (
    <Modal title="Recently Added" open={open} onCancel={onCancelClick}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center">
          <Tab value="Events" selected={selected === "Events"} onClick={() => setSelected("Events")} />
          <Tab value="Todos" selected={selected === "Todos"} onClick={() => setSelected("Todos")} />
        </div>
        <span className={`${selected === "Events" ? "block" : "hidden"} flex flex-col gap-4`}>
          {events && events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event.event}
                color={getCalendarColor(calendars, event.user)}
                tag={event.tag}
                startTime={
                  event.actualStartTime ? new Date(event.actualStartTime) : new Date(event.startTime)
                }
                endTime={event.actualEndTime ? new Date(event.actualEndTime) : new Date(event.endTime)}
                showStartDate={event.actualStartTime ? event.actualStartTime : event.startTime}
                showEndDate={event.actualEndTime ? event.actualEndTime : showEndDate(event.endTime)}
                allDay={event.allDay}
              />
            ))
          ) : (
            <span className="pt-8 pb-8 sm:pt-4 sm:pb-4">
              <EmptyState type="Event" subtext="Events added in the last 12 hours will show here." />
            </span>
          )}
        </span>
        <span className={`${selected === "Todos" ? "block" : "hidden"} flex flex-col gap-4`}>
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo.todo}
                color={getCalendarColor(calendars, todo.user)}
                dueDate={todo.dueDate}
                recurring={todo.recurring}
              />
            ))
          ) : (
            <span className="pt-8 pb-8 sm:pt-4 sm:pb-4">
              <EmptyState type="Todo" subtext="Todos added in the last 12 hours will show here." />
            </span>
          )}
        </span>
      </div>
    </Modal>
  );
};

export default RecentlyAddedModal;
