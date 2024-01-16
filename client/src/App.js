//Taylor Zweigle, 2024
import React, { useEffect } from "react";

import * as Actions from "./actions";

import { useEventsContext } from "./hooks/useEventsContext";

const App = () => {
  const { events, dispatch } = useEventsContext();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: Actions.GET_EVENTS, payload: json });
      }
    };

    fetchEvents();
  }, []);

  return <div>{events && events.map((event) => <div key={event._id}>{event.event}</div>)}</div>;
};

export default App;
