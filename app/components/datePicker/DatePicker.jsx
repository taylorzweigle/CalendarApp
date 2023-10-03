//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Card from "../card/Card";
import Chip from "../chip/Chip";

import { months } from "../calendar/Calendar";

const DatePicker = ({ selectedMonth, selectedYear, isVisible, onChange }) => {
  const [year, setYear] = useState(selectedYear);

  return (
    <div className={`absolute ${isVisible ? "block" : "hidden"}`}>
      <Card isOnCard>
        <div className="flex flex-col gap-4 w-96 p-8">
          <div className="flex justify-around items-center">
            <button
              className="flex items-center justify-center rounded-full w-12 h-12 text-slate-700 hover:bg-slate-200"
              onClick={() => setYear(year - 1)}
            >
              <ArrowBackIcon />
            </button>
            <p className="text-lg text-slate-700 font-bold">{year}</p>
            <button
              className="flex items-center justify-center rounded-full w-12 h-12 text-slate-700 hover:bg-slate-200"
              onClick={() => setYear(year + 1)}
            >
              <ArrowForwardIcon />
            </button>
          </div>
          <div className="flex flex-wrap justify-center align-middle gap-4">
            {months.map((month) => (
              <Chip key={month} isSelected={months[selectedMonth] === month} onClick={() => onChange(year, month)}>
                {month.slice(0, 3)}
              </Chip>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DatePicker;
