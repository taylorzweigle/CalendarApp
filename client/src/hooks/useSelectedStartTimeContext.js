//Taylor Zweigle, 2024
import { useContext } from "react";

import { SelectedStartTimeContext } from "../context/SelectedStartTimeContext";

export const useSelectedStartTimeContext = () => {
  const context = useContext(SelectedStartTimeContext);

  if (!context) {
    throw Error("useSelectedStartTimeContext must be used inside the SelectedStartTimeContextProvider");
  }

  return context;
};
