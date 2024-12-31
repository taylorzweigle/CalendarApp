//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const CalendarsContext = createContext();

export const calendarsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_CALENDARS:
      return { calendars: action.payload };
    case Actions.CREATE_CALENDAR:
      return { calendars: [action.payload, ...state.calendars] };
    case Actions.DELETE_CALENDAR:
      return { calendars: state.calendars.filter((calendar) => calendar._id !== action.payload._id) };
    default:
      return state;
  }
};

export const CalendarsContextProvider = ({ children }) => {
  const [calendars, dispatchCalendars] = useReducer(calendarsReducer, {
    calendars: [],
  });

  return (
    <CalendarsContext.Provider value={{ ...calendars, dispatchCalendars }}>
      {children}
    </CalendarsContext.Provider>
  );
};
