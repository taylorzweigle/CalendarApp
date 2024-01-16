//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const EventsContext = createContext();

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_EVENTS:
      return { events: action.payload };
    case Actions.CREATE_EVENT:
      return { events: [...action.payload, ...state.events] };
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
