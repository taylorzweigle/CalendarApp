"use client";

import React from "react";

const CalendarDay = ({ day, isToday, isNotInMonth, isSelected, onClick }) => {
  return (
    <td
      className={`border border-separate text-slate-700 h-32 ${
        isSelected ? "border-2 border-slate-700" : "border-solid border-slate-500"
      } ${isNotInMonth ? "bg-slate-100" : "bg-white"}`}
      onClick={onClick}
    >
      <div className="flex flex-col justify-between p-2 h-full">
        <span
          className={`flex items-center justify-center rounded-full w-12 h-12 ${isToday ? "bg-slate-700 text-white" : null}`}
        >
          {day}
        </span>
      </div>
    </td>
  );
};

export default CalendarDay;
