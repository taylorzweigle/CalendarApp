//Taylor Zweigle, 2024
import { useState } from "react";

import * as ACTIONS from "../actions";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: ACTIONS.LOGIN, payload: json });

      setLoading(false);
    }
  };

  return { login, error, loading };
};
