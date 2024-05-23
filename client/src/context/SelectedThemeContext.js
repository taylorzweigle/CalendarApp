//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const SelectedThemeContext = createContext();

export const selectedThemeReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_SELECTED_THEME:
      return state;
    case Actions.SET_SELECTED_THEME:
      return action.payload;
    default:
      return state;
  }
};

export const SelectedThemeContextProvider = ({ children }) => {
  const [selectedTheme, dispatchSelectedTheme] = useReducer(selectedThemeReducer, "dark");

  return (
    <SelectedThemeContext.Provider value={{ selectedTheme, dispatchSelectedTheme }}>{children}</SelectedThemeContext.Provider>
  );
};
