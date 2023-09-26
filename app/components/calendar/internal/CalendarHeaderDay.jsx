"use client";

import React from "react";

const CalendarHeaderDay = ({ day }) => {
  return (
    <th className="border border-collapse border-solid border-black h-8 bg-white" key={day}>
      {day.slice(0, 3)}
    </th>
  );
};

export default CalendarHeaderDay;
