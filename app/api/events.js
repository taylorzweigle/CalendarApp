//Taylor Zweigle, 2023
export const getEvents = async () => {
  const res = await fetch("http://localhost:5000/events");

  return res.json();
};

export const getEvent = async (event) => {
  const res = await fetch(`http://localhost:5000/events/${event.id}`);

  return res.json();
};

export const createEvent = async (body) => {
  const res = await fetch("http://localhost:5000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const deleteEvent = async (event) => {
  const res = await fetch(`http://localhost:5000/events/${event.id}`, {
    method: "DELETE",
  });
};
