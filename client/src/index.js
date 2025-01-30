//Taylor Zweigle, 2025
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import { AuthContextProvider } from "./context/AuthContext";
import { CalendarsContextProvider } from "./context/CalendarsContext";
import { EventsContextProvider } from "./context/EventsContext";
import { SelectedDateContextProvider } from "./context/SelectedDateContext";
import { TodosContextProvider } from "./context/TodosContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CalendarsContextProvider>
        <EventsContextProvider>
          <SelectedDateContextProvider>
            <TodosContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </TodosContextProvider>
          </SelectedDateContextProvider>
        </EventsContextProvider>
      </CalendarsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
