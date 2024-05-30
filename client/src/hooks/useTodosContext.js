//Taylor Zweigle, 2024
import { useContext } from "react";

import { TodosContext } from "../context/TodosContext";

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw Error("useTodosContext must be used inside the TodosContextProvider");
  }

  return context;
};
