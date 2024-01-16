//Taylor Zweigle, 2024
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { EventsContextProvider } from "./context/EventsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <EventsContextProvider>
      <App />
    </EventsContextProvider>
  </React.StrictMode>
);
