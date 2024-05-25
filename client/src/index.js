//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { EventsContextProvider } from "./context/EventsContext";
import { SelectedDateContextProvider } from "./context/SelectedDateContext";
import { SelectedStartTimeContextProvider } from "./context/SelectedStartTimeContext";
import { SelectedThemeContextProvider } from "./context/SelectedThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventsContextProvider>
        <SelectedDateContextProvider>
          <SelectedStartTimeContextProvider>
            <SelectedThemeContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SelectedThemeContextProvider>
          </SelectedStartTimeContextProvider>
        </SelectedDateContextProvider>
      </EventsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
