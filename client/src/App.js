//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";

import { useAuthContext } from "./hooks/useAuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

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
  const [theme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    theme === "dark" && document.documentElement.classList.add("dark");
  });

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
