//Taylor Zweigle, 2024
import { useContext } from "react";

import { SelectedDateContext } from "../context/SelectedDateContext";

export const useSelectedDateContext = () => {
  const context = useContext(SelectedDateContext);

  if (!context) {
    throw Error("useSelectedDateContext must be used inside the SelectedDateContextProvider");
  }

  return context;
};
