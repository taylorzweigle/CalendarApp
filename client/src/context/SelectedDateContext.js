//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const SelectedDateContext = createContext();

export const selectedDateReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_SELECTED_DATE:
      return state;
    case Actions.SET_SELECTED_DATE:
      return action.payload;
    default:
      return state;
  }
};

export const SelectedDateContextProvider = ({ children }) => {
  const today = new Date();

  const [selectedDate, dispatchSelectedDate] = useReducer(selectedDateReducer, {
    month: today.getMonth(),
    date: today.getDate(),
    year: today.getFullYear(),
    weekday: today.getDay(),
  });

  return <SelectedDateContext.Provider value={{ selectedDate, dispatchSelectedDate }}>{children}</SelectedDateContext.Provider>;
};
