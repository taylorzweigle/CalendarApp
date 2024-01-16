//Taylor Zweigle, 2024
import { useContext } from "react";

import { EventsContext } from "../context/EventsContext";

export const useEventsContext = () => {
  const context = useContext(EventsContext);

  if (!context) {
    throw Error("useEventsContext must be used inside the EventsContextProvider");
  }

  return context;
};
