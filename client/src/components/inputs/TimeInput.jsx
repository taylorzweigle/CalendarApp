//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Typography from "../../core/typography/Typography";

import NumberInput from "./NumberInput";

const TimeInput = ({
  label,
  hour,
  minutes,
  period,
  error,
  onHourChange,
  onMinutesChange,
  onPeriodChange,
}) => {
  const [selected, setSelected] = useState("AM");

  useEffect(() => {
    period && setSelected(period);
  }, [period]);

  const Button = ({ children, onClick }) => {
    return (
      <div
        className={`flex flex-row justify-between items-center bg-white dark:bg-slate-800 ${
          selected === children
            ? "border-2 border-sky-500 dark:border-sky-600"
            : "hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-white dark:border-slate-800"
        } text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12 cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };

  const handlePeriodChange = (value) => {
    onPeriodChange(value);

    setSelected(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="primary">
        {label}
      </Typography>
      <div className="flex flex-row gap-4">
        <NumberInput label="hour" value={hour} maxLength={2} onChange={onHourChange} />
        <NumberInput label="minutes" value={minutes} maxLength={2} onChange={onMinutesChange} />
        <div className="flex flex-row items-center gap-0">
          <Button onClick={() => handlePeriodChange("AM")}>AM</Button>
          <Button onClick={() => handlePeriodChange("PM")}>PM</Button>
        </div>
      </div>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TimeInput;
