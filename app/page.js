//Taylor Zweigle, 2023
"use client";

import React from "react";

import { EventsContextProvider } from "./context/EventContext";

import CalendarCard from "./recipes/CalendarCard";

export default function Home() {
  return (
    <EventsContextProvider>
      <CalendarCard />
    </EventsContextProvider>
  );
}
