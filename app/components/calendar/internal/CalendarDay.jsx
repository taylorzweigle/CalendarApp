"use client";

import React from "react";

const CalendarDay = ({ day }) => {
  return (
    <td className="border border-solid border-black">
      <div className="flex flex-col p-2">
        <div>{day}</div>
      </div>
    </td>
  );
};

export default CalendarDay;
