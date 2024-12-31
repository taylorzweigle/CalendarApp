//Taylor Zweigle, 2024
import { useContext } from "react";

import { CalendarsContext } from "../context/CalendarsContext";

export const useCalendarsContext = () => {
  const context = useContext(CalendarsContext);

  if (!context) {
    throw Error("useCalendarsContext must be used inside the CalendarsContextProvider");
  }

  return context;
};
