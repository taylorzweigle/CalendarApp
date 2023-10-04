//Taylor Zweigle, 2023
"use client";

import React from "react";

const CalendarDay = ({ day, isToday, isNotInMonth, isSelected, onClick, children }) => {
  return (
    <td
      className={`border border-separate text-slate-700 h-52 ${
        isSelected ? "border-2 border-slate-700" : "border-solid border-slate-500"
      } ${isNotInMonth ? "bg-slate-100" : "bg-white cursor-pointer"}`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-4 p-2 h-full">
        <span
          className={`flex items-center justify-center rounded-full w-11 h-16 ${isToday ? "bg-slate-700 text-white" : null}`}
        >
          {day}
        </span>
        {children}
      </div>
    </td>
  );
};

export default CalendarDay;
