//Taylor Zweigle, 2024
import React from "react";

import NumberInput from "../numberInput/NumberInput";
import SelectInput from "../selectInput/SelectInput";
import Typography from "../typography/Typography";

import { months } from "../../components/calendar/Calendar";

const DateInput = ({ label, month, date, year, onMonthChange, onDateChange, onYearChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <div className="flex flex-row gap-4">
        <div className="w-256">
          <SelectInput label="month" value={month} items={["", ...months]} onChange={onMonthChange} />
        </div>
        <NumberInput label="date" value={date} onChange={onDateChange} />
        <NumberInput label="year" value={year} onChange={onYearChange} />
      </div>
    </div>
  );
};

export default DateInput;
