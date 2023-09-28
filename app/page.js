"use client";

import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import Button from "./components/button/Button";
import Calendar from "./components/calendar/Calendar";
import DatePicker from "./components/datePicker/DatePicker";

import { daysOfWeek, months } from "./data";
import Card from "./components/card/Card";

export default function Home() {
  const [dropDownIsVisible, setDropDownIsVisible] = useState(false);

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState({
    month: today.getMonth(),
    date: today.getDate(),
    year: today.getFullYear(),
    weekday: today.getDay(),
  });

  const handleDatePickerChange = (year, month) => {
    let monthIndex = 0;

    for (let i = 0; i < months.length; i++) {
      if (month === months[i]) {
        monthIndex = i;
      }
    }

    setSelectedDate({
      month: monthIndex,
      date: 1,
      year: year,
      weekday: new Date(selectedDate.year, selectedDate.month, 1).getDay(),
    });

    setDropDownIsVisible(false);
  };

  const handleTodayClick = () => {
    setSelectedDate({ month: today.getMonth(), date: today.getDate(), year: today.getFullYear(), weekday: today.getDay() });

    setDropDownIsVisible(false);
  };

  const handlePreviousButtonClick = () => {
    setSelectedDate({
      month: selectedDate.month === 0 ? 11 : selectedDate.month - 1,
      date: 1,
      year: selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
      weekday: new Date(selectedDate.year, selectedDate.month - 1, 1).getDay(),
    });

    setDropDownIsVisible(false);
  };

  const handleNextButtonClick = () => {
    setSelectedDate({
      month: (selectedDate.month + 1) % 12,
      date: 1,
      year: selectedDate.month === 11 ? selectedDate.year + 1 : selectedDate.year,
      weekday: new Date(selectedDate.year, selectedDate.month + 1, 1).getDay(),
    });

    setDropDownIsVisible(false);
  };

  const handleSelectDay = (year, month, day) => {
    setSelectedDate({
      month: month,
      date: day,
      year: year,
      weekday: new Date(year, month, day).getDay(),
    });

    setDropDownIsVisible(false);
  };

  return (
    <Card>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4">
            <p className="text-3xl">{`${months[selectedDate.month]} ${selectedDate.year}`}</p>
            <div>
              <Button onClick={() => setDropDownIsVisible(!dropDownIsVisible)}>
                <ArrowDropDownIcon />
              </Button>
              <DatePicker
                isVisible={dropDownIsVisible}
                selectedMonth={selectedDate.month}
                selectedYear={selectedDate.year}
                onChange={(year, month) => handleDatePickerChange(year, month)}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
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
        <p className="text-lg text-slate-700">
          {`${daysOfWeek[selectedDate.weekday]}, ${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`}
        </p>
      </div>
    </Card>
  );
}
