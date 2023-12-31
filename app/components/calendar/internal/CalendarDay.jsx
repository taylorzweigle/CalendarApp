//Taylor Zweigle, 2023
"use client";

import React from "react";

const CalendarDay = ({ day, today, outOfMonth, selected, onClick, children }) => {
  return (
    <td
      className={`border border-separate text-slate-700 dark:text-white h-44 ${
        selected ? "border-2 border-slate-700 dark:border-slate-300" : "border-solid border-slate-500 dark:border-slate-600"
      } ${outOfMonth ? "bg-slate-100 dark:bg-slate-950" : "bg-white dark:bg-slate-800 cursor-pointer"}`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-4 p-2 h-full">
        <span
          className={`flex items-center justify-center rounded-full w-11 h-16 ${
            today ? "bg-slate-700 dark:bg-slate-600 text-white" : null
          }`}
        >
          {day}
        </span>
        {children}
      </div>
    </td>
  );
};

export default CalendarDay;
