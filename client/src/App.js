//Taylor Zweigle, 2024
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useAuthContext } from "./hooks/useAuthContext";

import CalendarApp from "./pages/CalendarApp";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
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
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <CalendarApp /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
