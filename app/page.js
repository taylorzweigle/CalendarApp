//Taylor Zweigle, 2023
"use client";

import React, { useState, useEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import Button from "./components/button/Button";
import Calendar, { months } from "./components/calendar/Calendar";
import DatePicker from "./components/datePicker/DatePicker";
import Menu from "./components/menu/Menu";
import Modal from "./components/modal/Modal";
import Typography from "./components/typography/Typography";

import DetailsLayout from "./recipes/DetailsLayout";
import HeaderLayout from "./recipes/HeaderLayout";
import LegendLayout from "./recipes/LegendLayout";

import Card from "./components/card/Card";

import { calendars } from "./utility/calendars";

import { useEvents } from "./hooks/useEvents";
import AddNewEventModal from "./recipes/AddNewEventModal";

export default function Home() {
  const today = new Date();

  const [events, setEvents] = useState(null);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents(await useEvents());
    };

    fetchEvents();
  }, []);

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
    <>
      <AddNewEventModal open={addModal} onSaveClick={() => setAddModal(false)} onCancelClick={() => setAddModal(false)} />
      <Card>
        <div className="grid grid-cols-4">
          <div className="border-r border-slate-300 dark:border-slate-600">
            <HeaderLayout user="Taylor Zweigle" onAddEventClick={() => setAddModal(true)} />
            <DetailsLayout data={events} calendars={calendars} selectedDate={selectedDate} />
            <LegendLayout />
          </div>
          <div className="flex flex-col gap-4 p-8 col-span-3">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-4 items-center">
                <Typography variant="title">{`${months[selectedDate.month]} ${selectedDate.year}`}</Typography>
                <Menu
                  button={<ArrowDropDownIcon />}
                  content={
                    <DatePicker
                      selectedMonth={selectedDate.month}
                      selectedYear={selectedDate.year}
                      onChange={(year, month) => handleDatePickerChange(year, month)}
                    />
                  }
                />
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Button prefix={<TodayIcon />} onClick={() => handleTodayClick()} />
                <Button prefix={<ArrowBackIcon />} onClick={() => handlePreviousButtonClick()} />
                <Button prefix={<ArrowForwardIcon />} onClick={() => handleNextButtonClick()} />
              </div>
            </div>
            <Calendar
              data={events}
              calendars={calendars}
              today={today}
              selectedDate={selectedDate}
              onSelectDay={handleSelectDay}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
