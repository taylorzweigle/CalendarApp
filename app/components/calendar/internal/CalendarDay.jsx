"use client";

import React from "react";

const CalendarDay = ({ day, isToday, isNotInMonth, isSelected, onClick }) => {
  return (
    <td
      className={`border border-collapse h-24 ${isSelected ? "border-2 border-blue-900" : "border-solid border-black"} ${
        isToday ? "bg-blue-100" : isNotInMonth ? "bg-stone-300" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col p-2">
        <div>{day}</div>
      </div>
    </td>
  );
};

export default CalendarDay;
