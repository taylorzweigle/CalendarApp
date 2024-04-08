//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const SelectedStartTimeContext = createContext();

export const selectedStartTimeReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_SELECTED_START_TIME:
      return state;
    case Actions.SET_SELECTED_START_TIME:
      return action.payload;
    default:
      return state;
  }
};

export const SelectedStartTimeContextProvider = ({ children }) => {
  const [selectedStartTime, dispatchSelectedStartTime] = useReducer(selectedStartTimeReducer, "");

  return (
    <SelectedStartTimeContext.Provider value={{ selectedStartTime, dispatchSelectedStartTime }}>
      {children}
    </SelectedStartTimeContext.Provider>
  );
};
