//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

import * as Actions from "./actions";

import { useAuthContext } from "./hooks/useAuthContext";
import { useEventsContext } from "./hooks/useEventsContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSelectedDateContext } from "./hooks/useSelectedDateContext";
import { useTodosContext } from "./hooks/useTodosContext";

import { getEvents } from "./api/events";
import { getTodos } from "./api/todos";

import ScrollToTop from "./ScrollToTop";

import CalendarPage from "./pages/CalendarPage";
import CreateEventPage from "./pages/CreateEventPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import DayViewPage from "./pages/DayViewPage";
import EditEventPage from "./pages/EditEventPage";
import EditTodoPage from "./pages/EditTodoPage";
import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";

const App = () => {
  const { user } = useAuthContext();
  const { dispatchEvents } = useEventsContext();
  const [theme] = useLocalStorage("theme", "dark");
  const { dispatchSelectedDate } = useSelectedDateContext();
  const { dispatchTodos } = useTodosContext();

  useEffect(() => {
    theme === "dark" && document.documentElement.classList.add("dark");
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents(user.token);

      dispatchEvents({ type: Actions.GET_EVENTS, payload: events.json });
    };

    if (user) {
      fetchEvents();
    }
  }, [dispatchEvents, user]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(user.token);

      dispatchTodos({ type: Actions.GET_TODOS, payload: todos.json });
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatchTodos, user]);

  useEffect(() => {
    const today = new Date();

    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear(),
        weekday: today.getDay(),
        hour: "",
        minute: "",
        period: "",
      },
    });
  }, [dispatchSelectedDate]);

  return (
    <ScrollToTop>
      <Routes>
        <Route path="/todo/:id" element={user ? <EditTodoPage /> : <Navigate to="/login" />} />
        <Route path="/event/:id" element={user ? <EditEventPage /> : <Navigate to="/login" />} />
        <Route path="/todo" element={user ? <CreateTodoPage /> : <Navigate to="/login" />} />
        <Route path="/event" element={user ? <CreateEventPage /> : <Navigate to="/login" />} />
        <Route path="/todos" element={user ? <TodosPage /> : <Navigate to="/login" />} />
        <Route path="/day" element={user ? <DayViewPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <CalendarPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
