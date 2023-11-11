//Taylor Zweigle, 2023
"use client";

import React, { useEffect } from "react";

import { EventsContextProvider } from "./context/EventContext";

import CalendarCard from "./recipes/CalendarCard";

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  });

  return (
    <EventsContextProvider>
      <CalendarCard />
    </EventsContextProvider>
  );
}
