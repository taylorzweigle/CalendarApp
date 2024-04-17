//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../../core/typography/Typography";

const CalendarDay = ({ day, today, outOfMonth, selected, onClick, children }) => {
  return (
    <td
      className={`border border-separate h-24 sm:h-24 md:h-44 ${
        selected
          ? "border-2 border-slate-700 dark:border-slate-300"
          : today
          ? "border-2 border-sky-500 dark:border-sky-400"
          : "border-solid border-slate-300 dark:border-slate-600"
      } ${outOfMonth ? "bg-slate-100 dark:bg-slate-950" : "bg-white dark:bg-slate-800 cursor-pointer"}`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1 sm:gap-2 p-1 sm:p-2 h-full">
        <Typography variant="body1" color={outOfMonth ? "secondary" : "primary"}>
          {day}
        </Typography>
        {children}
      </div>
    </td>
  );
};

export default CalendarDay;
