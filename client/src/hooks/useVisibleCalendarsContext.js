//Taylor Zweigle, 2025
import { useContext } from "react";

import { VisibleCalendarsContext } from "../context/VisibleCalendarsContext";

export const useVisibleCalendarsContext = () => {
  const context = useContext(VisibleCalendarsContext);

  if (!context) {
    throw Error("useVisibleCalendarsContext must be used inside the VisibleCalendarsContextProvider");
  }

  return context;
};
