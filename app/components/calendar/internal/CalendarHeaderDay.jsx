"use client";

import React from "react";

const CalendarHeaderDay = ({ day }) => {
  return (
    <th className="border border-solid border-black" key={day}>
      {day.slice(0, 3)}
    </th>
  );
};

export default CalendarHeaderDay;
