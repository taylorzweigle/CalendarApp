//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

const App = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");

      if (res.ok) {
        setEvents(await res.json());
      }
    };

    fetchEvents();
  }, []);

  return <div>{events && events.map((event) => <div>{event.event}</div>)}</div>;
};

export default App;
