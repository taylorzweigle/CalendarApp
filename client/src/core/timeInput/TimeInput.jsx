//Taylor Zweigle, 2024
import React from "react";

import NumberInput from "../numberInput/NumberInput";
import SelectInput from "../selectInput/SelectInput";
import Typography from "../typography/Typography";

const TimeInput = ({ label, hour, minutes, period, error, onHourChange, onMinutesChange, onPeriodChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <div className="flex flex-row gap-4">
        <NumberInput label="hour" value={hour} onChange={onHourChange} />
        <NumberInput label="minutes" value={minutes} onChange={onMinutesChange} />
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
