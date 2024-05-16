//Taylor Zweigle, 2024
import React from "react";

import SelectInput from "../../core/selectInput/SelectInput";
import Typography from "../../core/typography/Typography";

import NumberInput from "./NumberInput";

const TimeInput = ({ label, hour, minutes, period, error, onHourChange, onMinutesChange, onPeriodChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <div className="flex flex-row gap-4">
        <NumberInput label="hour" value={hour} maxLength={2} onChange={onHourChange} />
        <NumberInput label="minutes" value={minutes} maxLength={2} onChange={onMinutesChange} />
        <SelectInput label="period" value={period} items={["", "AM", "PM"]} onChange={onPeriodChange} />
      </div>
      {error && (
        <Typography variant="body2" color="text-red-500 dark:text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TimeInput;
