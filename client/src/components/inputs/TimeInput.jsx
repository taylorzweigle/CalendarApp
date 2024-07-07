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
        className={`inline-flex justify-center items-center h-12 w-14 rounded-full ${
          selected === children
            ? "bg-sky-500 dark:bg-sky-500"
            : "active:bg-sky-200 active:dark:bg-slate-700 md:hover:bg-sky-200 md:hover:dark:bg-slate-700"
        } cursor-pointer`}
        onClick={onClick}
      >
        <Typography variant="body1" color={selected === children ? "primary" : "secondary"}>
          {children}
        </Typography>
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
        <div className="flex flex-row items-center gap-2">
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
