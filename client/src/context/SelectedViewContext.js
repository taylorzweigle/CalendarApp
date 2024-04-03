//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";
import * as Payloads from "../payloads";

export const SelectedViewContext = createContext();

export const selectedViewReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_SELECTED_VIEW:
      return state;
    case Actions.SET_SELECTED_VIEW:
      return action.payload;
    default:
      return state;
  }
};

export const SelectedViewContextProvider = ({ children }) => {
  const [selectedView, dispatchSelectedView] = useReducer(selectedViewReducer, Payloads.CALENDAR_VIEW_CALENDAR);

  return <SelectedViewContext.Provider value={{ selectedView, dispatchSelectedView }}>{children}</SelectedViewContext.Provider>;
};
