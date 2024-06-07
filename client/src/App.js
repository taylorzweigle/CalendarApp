//Taylor Zweigle, 2024
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useAuthContext } from "./hooks/useAuthContext";

import CalendarPage from "./pages/CalendarPage";
import CreateEventPage from "./pages/CreateEventPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import DayViewPage from "./pages/DayViewPage";
import EditEventPage from "./pages/EditEventPage";
import EditTodoPage from "./pages/EditTodoPage";
import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";
import ViewEventPage from "./pages/ViewEventPage";

const App = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/todo/:id"
        element={
          user && user.username === "calendarapp_edit" ? (
            <EditTodoPage />
          ) : user && user.username === "calendarapp_testing" ? (
            <EditTodoPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/event/:id"
        element={
          user && user.username === "calendarapp" ? (
            <ViewEventPage />
          ) : user && user.username === "calendarapp_edit" ? (
            <EditEventPage />
          ) : user && user.username === "calendarapp_testing" ? (
            <EditEventPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/todo" element={user ? <CreateTodoPage /> : <Navigate to="/login" />} />
      <Route path="/event" element={user ? <CreateEventPage /> : <Navigate to="/login" />} />
      <Route path="/todos" element={user ? <TodosPage /> : <Navigate to="/login" />} />
      <Route path="/day" element={user ? <DayViewPage /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <CalendarPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
