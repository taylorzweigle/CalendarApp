//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Typography from "../../core/typography/Typography";

import NumberInput from "./NumberInput";
import Chip from "../../core/chip/Chip";

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
          <Chip circle selected={selected === "AM"} onClick={() => handlePeriodChange("AM")}>
            AM
          </Chip>
          <Chip circle selected={selected === "PM"} onClick={() => handlePeriodChange("PM")}>
            PM
          </Chip>
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
