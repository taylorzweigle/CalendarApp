//Taylor Zweigle, 2024
import React from "react";
import { Route, Routes, Navigate } from "react-router";

import CalendarApp from "./pages/CalendarApp";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<CalendarApp />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
