//Taylor Zweigle, 2024
const API_URL = process.env.NODE_ENV === "production" ? "https://calendar-app-server-pi.vercel.app" : "http://localhost:5000";

export const getEvents = async (token) => {
  const res = await fetch(`${API_URL}/api/events`, {
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

export const getEvent = async (event, token) => {
  const res = await fetch(`${API_URL}/api/events/${event._id}`, {
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

export const createEvent = async (body, token) => {
  const res = await fetch(`${API_URL}/api/events`, {
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

export const deleteEvent = async (event, token) => {
  const res = await fetch(`${API_URL}/api/events/${event._id}`, {
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

export const updateEvent = async (event, body, token) => {
  const res = await fetch(`${API_URL}/api/events/${event._id}`, {
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
