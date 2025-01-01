//Taylor Zweigle, 2025
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { CalendarsContextProvider } from "./context/CalendarsContext";
import { EventsContextProvider } from "./context/EventsContext";
import { SelectedDateContextProvider } from "./context/SelectedDateContext";
import { TodosContextProvider } from "./context/TodosContext";
import { VisibleCalendarsContextProvider } from "./context/VisibleCalendarsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CalendarsContextProvider>
        <EventsContextProvider>
          <SelectedDateContextProvider>
            <TodosContextProvider>
              <VisibleCalendarsContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </VisibleCalendarsContextProvider>
            </TodosContextProvider>
          </SelectedDateContextProvider>
        </EventsContextProvider>
      </CalendarsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
