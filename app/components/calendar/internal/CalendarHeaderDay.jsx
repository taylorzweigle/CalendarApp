"use client";

import React from "react";

const CalendarHeaderDay = ({ day }) => {
  return (
    <th className="bg-white text-slate-700 h-16" key={day}>
      {day.slice(0, 3)}
    </th>
  );
};

export default CalendarHeaderDay;
