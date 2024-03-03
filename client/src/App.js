//Taylor Zweigle, 2024
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { useAuthContext } from "./hooks/useAuthContext";

import CalendarApp from "./pages/CalendarApp";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/" element={user ? <CalendarApp /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
