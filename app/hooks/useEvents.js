//Taylor Zweigle, 2023
const getEvents = async () => {
  const res = await fetch("http://localhost:5000/events");

  return res.json();
};

export const useEvents = async () => {
  const events = await getEvents();

  return events;
};
