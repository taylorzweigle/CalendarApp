//Taylor Zweigle, 2024
import React from "react";

const CalendarHeaderDay = ({ day }) => {
  return (
    <th
      className="bg-white dark:bg-slate-800 border border-slate-500 dark:border-slate-600 text-slate-700 dark:text-slate-300 h-12"
      key={day}
    >
      {day.slice(0, 3)}
    </th>
  );
};

export default CalendarHeaderDay;
