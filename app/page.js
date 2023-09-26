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
  const [today, setToday] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState({
    month: today.getMonth(),
    date: today.getDate(),
    year: today.getFullYear(),
    weekday: today.getDay(),
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Select title="Months" options={months} selected={months[today.getMonth()]} />
          <Select title="Years" options={years} selected={today.getFullYear()} />
        </div>
        <div className="flex flex-row gap-4">
          <Button>
            <TodayIcon />
          </Button>
          <Button>
            <ArrowBackIcon />
          </Button>
          <Button>
            <ArrowForwardIcon />
          </Button>
        </div>
      </div>
      <Calendar today={today} selectedDate={selectedDate} />
      <p className="text-md">
        {`${daysOfWeek[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()} `}
      </p>
    </div>
  );
}
