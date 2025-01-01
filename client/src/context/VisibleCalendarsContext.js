//Taylor Zweigle, 2025
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const VisibleCalendarsContext = createContext();

export const visibleCalendarsReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_VISIBLE_CALENDARS:
      return state;
    case Actions.SET_VISIBLE_CALENDARS:
      return action.payload;
    default:
      return state;
  }
};

export const VisibleCalendarsContextProvider = ({ children }) => {
  const [visibleCalendars, dispatchVisibleCalendars] = useReducer(visibleCalendarsReducer, []);

  return (
    <VisibleCalendarsContext.Provider value={{ visibleCalendars, dispatchVisibleCalendars }}>
      {children}
    </VisibleCalendarsContext.Provider>
  );
};
