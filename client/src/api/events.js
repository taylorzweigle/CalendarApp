//Taylor Zweigle, 2024
export const getEvents = async () => {
  const res = await fetch("/api/events");

  const json = await res.json();

  if (res.ok) {
    return json;
  }
};

export const getEvent = async (event) => {
  const res = await fetch(`/api/events/${event._id}`);

  const json = await res.json();

  if (res.ok) {
    return json;
  }
};

export const createEvent = async (body) => {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (res.ok) {
    return json;
  }
};

export const deleteEvent = async (event) => {
  const res = await fetch(`/api/events/${event._id}`, {
    method: "DELETE",
  });

  const json = await res.json();

  if (res.ok) {
    return json;
  }
};
