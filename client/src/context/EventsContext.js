//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

import { years } from "../api/years";

export const EventsContext = createContext();

const populateEvents = (events) => {
  let newEvents = [];

  for (let i = 0; i < events.length; i++) {
    if (events[i].recurring) {
      for (let j = 1; j <= years[years.length - 1] - new Date(events[i].startTime).getFullYear(); j++) {
        let temp = {
          _id: events[i]._id,
          key: events[i]._id + j,
          event: events[i].event,
          user: events[i].user,
          tag: events[i].tag,
          startTime: new Date(
            new Date(events[i].startTime).getFullYear() + j,
            new Date(events[i].startTime).getMonth(),
            new Date(events[i].startTime).getDate(),
            new Date(events[i].startTime).getHours(),
            new Date(events[i].startTime).getMinutes(),
            new Date(events[i].startTime).getSeconds(),
            new Date(events[i].startTime).getMilliseconds()
          ),
          endTime: new Date(
            new Date(events[i].endTime).getFullYear() + j,
            new Date(events[i].endTime).getMonth(),
            new Date(events[i].endTime).getDate(),
            new Date(events[i].endTime).getHours(),
            new Date(events[i].endTime).getMinutes(),
            new Date(events[i].endTime).getSeconds(),
            new Date(events[i].endTime).getMilliseconds()
          ),
          allDay: events[i].allDay,
          recurring: events[i].recurring,
          creationTime: events[i].creationTime,
          creationUser: events[i].creationUser,
        };

        newEvents.push(temp);
      }
    }

    if (
      new Date(events[i].startTime).getMonth() === new Date(events[i].endTime).getMonth() &&
      new Date(events[i].startTime).getDate() === new Date(events[i].endTime).getDate() &&
      new Date(events[i].startTime).getFullYear() === new Date(events[i].endTime).getFullYear()
    ) {
      newEvents.push(events[i]);
    } else {
      let startDate = new Date(events[i].startTime).getDate();
      let endDate = new Date(events[i].endTime).getDate();

      let difference = 0;

      if (new Date(events[i].startTime).getMonth() !== new Date(events[i].endTime).getMonth()) {
        difference =
          32 -
          new Date(
            new Date(events[i].startTime).getFullYear(),
            new Date(events[i].startTime).getMonth(),
            32
          ).getDate() +
          endDate -
          startDate;
      } else {
        difference = endDate - startDate;
      }

      for (let j = 0; j <= difference; j++) {
        if (j === 0) {
          let temp = {
            _id: events[i]._id,
            key: events[i]._id + j,
            event: events[i].event,
            user: events[i].user,
            tag: events[i].tag,
            startTime: events[i].allDay
              ? new Date(
                  new Date(events[i].startTime).getFullYear(),
                  new Date(events[i].startTime).getMonth(),
                  new Date(events[i].startTime).getDate(),
                  0,
                  0,
                  0,
                  0
                )
              : events[i].startTime,
            endTime: events[i].allDay
              ? new Date(
                  new Date(events[i].startTime).getFullYear(),
                  new Date(events[i].startTime).getMonth(),
                  new Date(events[i].startTime).getDate(),
                  0,
                  0,
                  0,
                  0
                )
              : new Date(
                  new Date(events[i].startTime).getFullYear(),
                  new Date(events[i].startTime).getMonth(),
                  new Date(events[i].startTime).getDate(),
                  23,
                  59,
                  59,
                  999
                ),
            type: "start",
            actualStartTime: events[i].startTime,
            actualEndTime: events[i].endTime,
            allDay: events[i].allDay,
            creationTime: events[i].creationTime,
            creationUser: events[i].creationUser,
          };

          newEvents.push(temp);
        } else if (j === difference) {
          let temp = {
            _id: events[i]._id,
            key: events[i]._id + j,
            event: events[i].event,
            user: events[i].user,
            tag: events[i].tag,
            startTime: new Date(
              new Date(events[i].endTime).getFullYear(),
              new Date(events[i].endTime).getMonth(),
              new Date(events[i].endTime).getDate(),
              6,
              0,
              0,
              0
            ),
            endTime: events[i].endTime,
            type: "end",
            actualStartTime: events[i].startTime,
            actualEndTime: events[i].endTime,
            allDay: events[i].allDay,
            creationTime: events[i].creationTime,
            creationUser: events[i].creationUser,
          };

          newEvents.push(temp);
        } else {
          let temp = {
            _id: events[i]._id,
            key: events[i]._id + j,
            event: events[i].event,
            user: events[i].user,
            tag: events[i].tag,
            startTime: new Date(
              new Date(events[i].startTime).getFullYear(),
              new Date(events[i].startTime).getMonth(),
              new Date(events[i].startTime).getDate() + j
            ),
            endTime: new Date(
              new Date(events[i].startTime).getFullYear(),
              new Date(events[i].startTime).getMonth(),
              new Date(events[i].startTime).getDate() + j
            ),
            type: "middle",
            actualStartTime: events[i].startTime,
            actualEndTime: events[i].endTime,
            allDay: true,
            creationTime: events[i].creationTime,
            creationUser: events[i].creationUser,
          };

          newEvents.push(temp);
        }
      }
    }
  }

  return newEvents;
};

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_EVENTS:
      return { events: populateEvents(action.payload) };
    case Actions.CREATE_EVENT:
      return { events: [action.payload, ...state.events] };
    case Actions.DELETE_EVENT:
      return { events: state.events.filter((event) => event._id !== action.payload._id) };
    default:
      return state;
  }
};

export const EventsContextProvider = ({ children }) => {
  const [events, dispatchEvents] = useReducer(eventsReducer, {
    events: [],
  });

  return <EventsContext.Provider value={{ ...events, dispatchEvents }}>{children}</EventsContext.Provider>;
};
