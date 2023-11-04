//Taylor Zweigle, 2023
"use client";

import React from "react";

import SelectInput from "../selectInput/SelectInput";
import Typography from "../typography/Typography";

const TimeInput = ({ label, hour, minutes, period, onHourChange, onMinutesChange, onPeriodChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <div className="flex flex-row gap-4">
        <SelectInput
          label="hour"
          value={hour}
          items={["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
          onChange={onHourChange}
        />
        <SelectInput label="minutes" value={minutes} items={["00", "30"]} onChange={onMinutesChange} />
        <SelectInput label="period" value={period} items={["", "AM", "PM"]} onChange={onPeriodChange} />
      </div>
    </div>
  );
};

export default TimeInput;
