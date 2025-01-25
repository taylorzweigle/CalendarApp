//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import Typography from "../../core/typography/Typography";

import TextInput from "../../core/textInput/TextInput";

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
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("AM");

  useEffect(() => {
    if (hour && minutes) {
      if (hour.length === 1) {
        setValue(`0${hour}:${minutes}`);
      } else {
        setValue(`${hour}:${minutes}`);
      }
    }
  }, [hour, minutes]);

  useEffect(() => {
    period && setSelected(period);
  }, [period]);

  const handleTimeChange = (event) => {
    let value = event.target.value;

    if (event.nativeEvent.inputType === "deleteContentBackward") {
      if (value.length === 3 && value[2] === ":") {
        value = value.slice(0, 2);
      }
    } else {
      value = value.length === 2 ? value + ":" : value;
    }

    setValue(value);

    if (value.length === 5) {
      const [hour, minutes] = value.split(":");

      onHourChange(hour);
      onMinutesChange(minutes);
    }
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
      <div className="relative inline-block">
        <TextInput label="time" placeholder="HH:MM" value={value} onChange={(e) => handleTimeChange(e)} />
        <div className="absolute top-0 right-0 flex flex-row items-center gap-0 h-12 px-2">
          <div
            className="flex justify-center items-center h-11 w-12 sm:hover:bg-slate-100 sm:hover:dark:bg-slate-800 active:bg-slate-100 active:dark:bg-slate-800 cursor-pointer"
            onClick={() => handlePeriodChange("AM")}
          >
            <Typography
              variant="body1"
              color={`${selected === "AM" ? "primary" : "secondary"}`}
              bold={selected === "AM"}
            >
              AM
            </Typography>
          </div>
          <div
            className="flex justify-center items-center h-11 w-12 sm:hover:bg-slate-100 sm:hover:dark:bg-slate-800 active:bg-slate-100 active:dark:bg-slate-800 cursor-pointer"
            onClick={() => handlePeriodChange("PM")}
          >
            <Typography
              variant="body1"
              color={`${selected === "PM" ? "primary" : "secondary"}`}
              bold={selected === "PM"}
            >
              PM
            </Typography>
          </div>
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
