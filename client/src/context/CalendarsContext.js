//Taylor Zweigle, 2025
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const CalendarsContext = createContext();

export const calendarsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_CALENDARS:
      return { calendars: action.payload };
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
