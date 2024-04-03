//Taylor Zweigle, 2024
import { useContext } from "react";

import { SelectedViewContext } from "../context/SelectedViewContext";

export const useSelectedViewContext = () => {
  const context = useContext(SelectedViewContext);

  if (!context) {
    throw Error("useSelectedViewContext must be used inside the SelectedViewContextProvider");
  }

  return context;
};
