//Taylor Zweigle, 2024
import * as Actions from "../actions";

import { useAuthContext } from "./useAuthContext";
import { useEventsContext } from "./useEventsContext";
import { useTodosContext } from "./useTodosContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchEvents } = useEventsContext();
  const { dispatch: dispatchTodos } = useTodosContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    dispatchEvents({ type: Actions.GET_EVENTS, payload: [] });
    dispatchTodos({ type: Actions.GET_TODOS, payload: [] });
  };

  return { logout };
};
