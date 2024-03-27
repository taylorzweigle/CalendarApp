//Taylor Zweigle, 2024
import React from "react";

const CalendarDay = ({ day, today, outOfMonth, selected, onClick, children }) => {
  return (
    <td
      className={`border border-separate h-24 sm:h-24 md:h-44 ${
        selected ? "border-2 border-slate-700 dark:border-slate-300" : "border-solid border-slate-500 dark:border-slate-600"
      } ${outOfMonth ? "bg-slate-100 dark:bg-slate-950" : "bg-white dark:bg-slate-800 cursor-pointer"}`}
      onClick={onClick}
    >
      <div className="flex flex-col p-1 sm:p-2 h-full">
        <span
          className={`flex items-center justify-center rounded-full w-8 sm:w-11 h-12 sm:h-16 ${
            today
              ? "bg-slate-700 dark:bg-slate-600 text-white"
              : outOfMonth
              ? "text-slate-700 dark:text-slate-400"
              : "text-slate-700 dark:text-white"
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
