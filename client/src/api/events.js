//Taylor Zweigle, 2024
export const getEvents = async () => {
  const res = await fetch("/api/events");

  return res.json();
};

export const getEvent = async (event) => {
  const res = await fetch(`/api/events/${event.id}`);

  return res.json();
};

export const createEvent = async (body) => {
  await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const deleteEvent = async (event) => {
  await fetch(`/api/events/${event.id}`, {
    method: "DELETE",
  });
};
