//Taylor Zweigle, 2024
import React from "react";

import Chip from "../chip/Chip";

const MonthPicker = ({ selectedMonth, onChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col gap-4 w-96 p-8">
      <div className="flex flex-wrap justify-center align-middle gap-4">
        {months.map((month) => (
          <Chip key={month} selected={months[selectedMonth] === month} onClick={() => onChange(month)}>
            {month.slice(0, 3)}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;
