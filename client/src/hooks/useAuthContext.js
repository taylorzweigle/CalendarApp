//Taylor Zweigle, 2024
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside the AuthContextProvider");
  }

  return context;
};
