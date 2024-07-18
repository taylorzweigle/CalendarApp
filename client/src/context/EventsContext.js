//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const EventsContext = createContext();

const populateEvents = (events) => {
  let newEvents = [];

  for (let i = 0; i < events.length; i++) {
    if (
      new Date(events[i].startTime).getMonth() === new Date(events[i].endTime).getMonth() &&
      new Date(events[i].startTime).getDate() === new Date(events[i].endTime).getDate() &&
      new Date(events[i].startTime).getFullYear() === new Date(events[i].endTime).getFullYear()
    ) {
      newEvents.push(events[i]);
    } else {
      let startDate = new Date(events[i].startTime).getDate();
      let endDate = new Date(events[i].endTime).getDate();

      let difference = endDate - startDate;

      for (let j = 0; j <= difference; j++) {
        if (j === 0) {
          let temp = {
            _id: events[i]._id,
            key: events[i]._id + j,
            event: events[i].event,
            user: events[i].user,
            tag: events[i].tag,
            startTime: events[i].startTime,
            endTime: new Date(
              new Date(events[i].startTime).getFullYear(),
              new Date(events[i].startTime).getMonth(),
              new Date(events[i].startTime).getDate(),
              23,
              59,
              59,
              999
            ),
            type: "start",
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
              0,
              0,
              0,
              0
            ),
            endTime: events[i].endTime,
            type: "end",
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
  const [state, dispatch] = useReducer(eventsReducer, {
    events: null,
  });

  return <EventsContext.Provider value={{ ...state, dispatch }}>{children}</EventsContext.Provider>;
};
