//Taylor Zweigle, 2023
"use client";

import React from "react";
import Typography from "../typography/Typography";

const TimeInput = ({ label, hour, minutes, period, onHourChange, onMinutesChange, onPeriodChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <div className="flex flex-row gap-4">
        <input
          type="number"
          id="hour"
          value={hour}
          onChange={onHourChange}
          className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
        />
        <select
          id="minutes"
          value={minutes}
          onChange={onMinutesChange}
          className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
        >
          <option value="">{""}</option>
          <option value="00">{"00"}</option>
          <option value="30">{"30"}</option>
        </select>
        <select
          id="minutes"
          value={period}
          onChange={onPeriodChange}
          className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
        >
          <option value="">{""}</option>
          <option value="AM">{"AM"}</option>
          <option value="PM">{"PM"}</option>
        </select>
      </div>
    </div>
  );
};

export default TimeInput;
