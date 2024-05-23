//Taylor Zweigle, 2024
import { useContext } from "react";

import { SelectedThemeContext } from "../context/SelectedThemeContext";

export const useSelectedThemeContext = () => {
  const context = useContext(SelectedThemeContext);

  if (!context) {
    throw Error("useSelectedThemeContext must be used inside the SelectedThemeContextProvider");
  }

  return context;
};
