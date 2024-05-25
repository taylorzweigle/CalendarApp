//Taylor Zweigle, 2024
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useAuthContext } from "./hooks/useAuthContext";

import CalendarPage from "./pages/CalendarPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
import TimelinePage from "./pages/TimelinePage";
import TodosPage from "./pages/TodosPage";
import ViewEventPage from "./pages/ViewEventPage";

const App = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/event/:id"
        element={
          user && user.username === "calendarapp" ? (
            <ViewEventPage />
          ) : user && user.username === "calendarapp_edit" ? (
            <EditEventPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/event" element={user ? <CreateEventPage /> : <Navigate to="/login" />} />
      <Route path="/todos" element={user ? <TodosPage /> : <Navigate to="/login" />} />
      <Route path="/timeline" element={user ? <TimelinePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <CalendarPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
