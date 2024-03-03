//Taylor Zweigle, 2024
import React, { createContext, useEffect, useReducer } from "react";

import * as Actions from "../actions";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return { user: action.payload };
    case Actions.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) dispatch({ type: Actions.LOGIN, payload: user });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
