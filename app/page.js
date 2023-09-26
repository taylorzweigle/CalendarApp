"use client";

import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import Button from "./components/button/Button";
import Calendar from "./components/calendar/Calendar";
import Select from "./components/select/Select";

import { daysOfWeek, months, years } from "./data";

export default function Home() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState({
    month: today.getMonth(),
    date: today.getDate(),
    year: today.getFullYear(),
    weekday: today.getDay(),
  });

  const handleMonthChange = (month) => {
    let monthIndex = 0;

    for (let i = 0; i < months.length; i++) {
      if (months[i] === month) {
        monthIndex = i;
      }
    }

    setSelectedDate({
      month: monthIndex,
      date: 1,
      year: selectedDate.year,
      weekday: new Date(selectedDate.year, monthIndex, 1).getDay(),
    });
  };

  const handleYearChange = (year) => {
    setSelectedDate({
      month: selectedDate.month,
      date: 1,
      year: year,
      weekday: new Date(year, selectedDate.month, 1).getDay(),
    });
  };

  const handleTodayClick = () => {
    setSelectedDate({ month: today.getMonth(), date: today.getDate(), year: today.getFullYear(), weekday: today.getDay() });
  };

  const handlePreviousButtonClick = () => {
    setSelectedDate({
      month: selectedDate.month === 0 ? 11 : selectedDate.month - 1,
      date: 1,
      year: selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
      weekday: new Date(selectedDate.year, selectedDate.month - 1, 1).getDay(),
    });
  };

  const handleNextButtonClick = () => {
    setSelectedDate({
      month: (selectedDate.month + 1) % 12,
      date: 1,
      year: selectedDate.month === 11 ? selectedDate.year + 1 : selectedDate.year,
      weekday: new Date(selectedDate.year, selectedDate.month + 1, 1).getDay(),
    });
  };

  const handleSelectDay = (year, month, day) => {
    setSelectedDate({
      month: month,
      date: day,
      year: year,
      weekday: new Date(year, month, day).getDay(),
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Select
            title="Months"
            options={months}
            value={months[selectedDate.month]}
            onChange={(e) => handleMonthChange(e.target.value)}
          />
          <Select title="Years" options={years} value={selectedDate.year} onChange={(e) => handleYearChange(e.target.value)} />
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={() => handleTodayClick()}>
            <TodayIcon />
          </Button>
          <Button onClick={() => handlePreviousButtonClick()}>
            <ArrowBackIcon />
          </Button>
          <Button onClick={() => handleNextButtonClick()}>
            <ArrowForwardIcon />
          </Button>
        </div>
      </div>
      <Calendar today={today} selectedDate={selectedDate} onSelectDay={handleSelectDay} />
      <p className="text-md">
        {`${daysOfWeek[selectedDate.weekday]}, ${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year} `}
      </p>
    </div>
  );
}
