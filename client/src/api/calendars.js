//Taylor Zweigle, 2024
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://calendar-app-server-sage.vercel.app"
    : "http://localhost:5000";

export const getCalendars = async (token) => {
  const res = await fetch(`${API_URL}/api/calendars`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const getCalendar = async (id, token) => {
  const res = await fetch(`${API_URL}/api/calendars/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const createCalendar = async (body, token) => {
  const res = await fetch(`${API_URL}/api/calendars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const deleteCalendar = async (id, token) => {
  const res = await fetch(`${API_URL}/api/calendars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const updateCalendar = async (id, body, token) => {
  const res = await fetch(`${API_URL}/api/calendars/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};
