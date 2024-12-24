//Taylor Zweigle, 2024
import React, { createContext, useReducer } from "react";

import * as Actions from "../actions";

export const TodosContext = createContext();

export const todosReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_TODOS:
      return { todos: action.payload };
    case Actions.CREATE_TODO:
      return { todos: [action.payload, ...state.todos] };
    case Actions.DELETE_TODO:
      return { todos: state.todos.filter((todo) => todo._id !== action.payload._id) };
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [todos, dispatchTodos] = useReducer(todosReducer, {
    todos: [],
  });

  return <TodosContext.Provider value={{ ...todos, dispatchTodos }}>{children}</TodosContext.Provider>;
};
