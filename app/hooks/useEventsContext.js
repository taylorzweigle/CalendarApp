//Taylor Zweigle, 2023
import { useContext } from "react";

import { EventsContext } from "../context/EventContext";

export const useEventsContext = () => {
  const context = useContext(EventsContext);

  if (!context) {
    throw Error("useEventsContext must be used inside an EventsContextProvider");
  }

  return context;
};
