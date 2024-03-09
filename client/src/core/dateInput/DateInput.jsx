//Taylor Zweigle, 2024
import React from "react";

import SelectInput from "../selectInput/SelectInput";
import TextInput from "../textInput/TextInput";
import Typography from "../typography/Typography";

import { months } from "../../components/calendar/Calendar";

const DateInput = ({ label, month, date, year, onMonthChange, onDateChange, onYearChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <div className="flex flex-row gap-4">
        <SelectInput label="month" value={month} items={["", ...months]} onChange={onMonthChange} />
        <TextInput label="date" value={date} onChange={onDateChange} />
        <TextInput label="year" value={year} onChange={onYearChange} />
      </div>
    </div>
  );
};

export default DateInput;
