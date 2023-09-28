"use client";

import React from "react";

const EventCard = ({ user, event }) => {
  return (
    <div className="flex flex-row border border-indigo-500 bg-indigo-50 rounded-lg overflow-clip">
      <div className="bg-indigo-500 w-2">&nbsp;</div>
      <div className="flex flex-col gap-0 p-2">
        <div className="text-sm font-bold text-indigo-900">{event}</div>
        <div className="text-xs text-indigo-900">{user}</div>
      </div>
    </div>
  );
};

export default EventCard;
