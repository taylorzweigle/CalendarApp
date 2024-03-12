//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import { AuthContextProvider } from "./context/AuthContext";
import { EventsContextProvider } from "./context/EventsContext";
import { SelectedDateContextProvider } from "./context/SelectedDateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventsContextProvider>
        <SelectedDateContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SelectedDateContextProvider>
      </EventsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
