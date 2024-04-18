//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../../core/typography/Typography";

const CalendarDay = ({ day, today, outOfMonth, selected, onClick, children }) => {
  return (
    <td
      className={`border border-separate h-24 sm:h-24 md:h-44 ${
        selected ? "border-2 border-slate-700 dark:border-slate-300" : "border-solid border-slate-300 dark:border-slate-600"
      } ${outOfMonth ? "bg-slate-100 dark:bg-slate-950" : "bg-white dark:bg-slate-800 cursor-pointer"}`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1 sm:gap-2 p-1 sm:p-2 h-full">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="body1" color={outOfMonth ? "secondary" : "primary"}>
            {day}
          </Typography>
          {today && (
            <div className="flex flex-row justify-center items-center rounded-full w-3 sm:w-12 h-3 sm:h-6 bg-slate-300 dark:bg-slate-500 sm:bg-slate-200 sm:dark:bg-slate-700">
              <span className="hidden sm:block">
                <Typography variant="caption" color="primary">
                  Today
                </Typography>
              </span>
            </div>
          )}
        </div>
        {children}
      </div>
    </td>
  );
};

export default CalendarDay;
