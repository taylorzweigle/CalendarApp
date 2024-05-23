//Taylor Zweigle, 2024
import React from "react";

import Label from "../../../core/label/Label";
import Typography from "../../../core/typography/Typography";

const CalendarDay = ({ day, today, outOfMonth, selected, onClick, children }) => {
  return (
    <td
      className={`border border-separate h-24 sm:h-24 md:h-44 ${
        selected
          ? "active:bg-slate-50 active:dark:bg-slate-700 border-2 border-slate-700 dark:border-slate-300"
          : "border-solid border-slate-300 dark:border-slate-600"
      } ${
        outOfMonth
          ? "bg-slate-100 dark:bg-slate-950"
          : "bg-white dark:bg-slate-800 active:bg-slate-50 active:dark:bg-slate-700 cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1 sm:gap-2 p-1 sm:p-2 h-full">
        <div className="flex flex-row justify-between items-center">
          <Typography variant="body1" color={outOfMonth ? "secondary" : "primary"}>
            {day}
          </Typography>
          {today && (
            <>
              <span className="hidden sm:block">
                <Label size="small" variant="default">
                  <span className="hidden sm:block">Today</span>
                </Label>
              </span>
              <span className="block sm:hidden">
                <div className="h-4 w-4 bg-slate-300 dark:bg-slate-600 rounded-full">&nbsp;</div>
              </span>
            </>
          )}
        </div>
        {children}
      </div>
    </td>
  );
};

export default CalendarDay;
