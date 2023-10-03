//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import Button from "./components/button/Button";
import Calendar from "./components/calendar/Calendar";
import DatePicker from "./components/datePicker/DatePicker";
import Typography from "./components/typography/Typography";

import DetailsLayout from "./layouts/DetailsLayout";
import HeaderLayout from "./layouts/HeaderLayout";
import LegendLayout from "./layouts/LegendLayout";

import { months } from "./components/calendar/internal/data";
import Card from "./components/card/Card";

import { db } from "./db/db";

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
      <div className="grid grid-cols-4">
        <div className="border-r border-slate-300">
          <HeaderLayout user="Taylor Zweigle" />
          <DetailsLayout selectedDate={selectedDate} />
          <LegendLayout />
        </div>
        <div className="flex flex-col gap-4 p-8 col-span-3">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              <Typography variant="title">{`${months[selectedDate.month]} ${selectedDate.year}`}</Typography>
              <div>
                <Button onClick={() => setDropDownIsVisible(!dropDownIsVisible)}>
                  {dropDownIsVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
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
          <Calendar data={db} today={today} selectedDate={selectedDate} onSelectDay={handleSelectDay} />
        </div>
      </div>
    </Card>
  );
}
