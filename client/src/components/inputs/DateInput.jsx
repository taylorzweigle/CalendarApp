//Taylor Zweigle, 2024
import React from "react";

import DateRangeIcon from "@mui/icons-material/DateRange";

import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";

const DateInput = ({ label, month, date, year, showLabel, onClick }) => {
  const input = () => {
    return (
      <div
        id={label}
        onClick={onClick}
        className="flex flex-row justify-between items-center bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-600 sm:hover:border-sky-500 sm:hover:dark:border-sky-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12 cursor-pointer"
      >
        <Typography variant="body1" color="primary">
          {month !== undefined && date && year ? `${months[month]} ${date}, ${year}` : ""}
        </Typography>
        <DateRangeIcon />
      </div>
    );
  };

  return showLabel ? (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="body1" color="primary">
        {label}
      </Typography>
      {input()}
    </div>
  ) : (
    input()
  );
};

export default DateInput;
