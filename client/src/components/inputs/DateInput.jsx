//Taylor Zweigle, 2024
import React from "react";

import SelectInput from "../../core/selectInput/SelectInput";
import Typography from "../../core/typography/Typography";

import NumberInput from "./NumberInput";

import { months } from "../calendar/Calendar";

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
        <NumberInput label="date" value={date} maxLength={2} onChange={onDateChange} />
        <NumberInput label="year" value={year} maxLength={4} onChange={onYearChange} />
      </div>
    </div>
  );
};

export default DateInput;
