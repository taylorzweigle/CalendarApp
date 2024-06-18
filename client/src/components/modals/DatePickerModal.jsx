//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Button from "../../core/button/Button";
import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

import { months, daysOfWeek } from "../calendar/Calendar";

const DatePickerModal = ({ open, month, date, year, onSaveClick, onCancelClick }) => {
  const [selectedDate, setSelectedDate] = useState({});

  const getMonthLength = (year, month) => 32 - new Date(year, month, 32).getDate();

  const getDayOfWeekOfMonthStart = (year, month) => new Date(year, month).getDay();

  useEffect(() => {
    setSelectedDate({ month: month, date: date, year: year });
  }, [month, date, year]);

  const handleCancelClick = () => {
    setSelectedDate({ month: month, date: date, year: year });

    onCancelClick();
  };

  const populateCalendar = (year, month) => {
    let calendarDays = [];
    let calendarDaysByWeek = [];

    let remainingDays = 0;

    const monthLength = getMonthLength(year, month);

    const prevMonthLength = getMonthLength(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1);

    const dayOfWeekOfMonthStart = getDayOfWeekOfMonthStart(year, month);

    for (let i = dayOfWeekOfMonthStart - 1; i >= 0; i--) {
      calendarDays.push({
        key: `${month - 1 < 10 ? "0" : ""}${month === 0 ? 11 : month - 1}${prevMonthLength - i}`,
        date: "",
      });
    }

    for (let i = 1; i <= monthLength; i++) {
      calendarDays.push({ key: `${month < 10 ? "0" : ""}${month}${i}`, date: i });
    }

    remainingDays = 7 - (calendarDays.length % 7);

    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        calendarDays.push({ key: `${month + 1 < 10 ? "0" : ""}${month + 1}${i}`, date: "" });
      }
    }

    for (let i = 0; i < calendarDays.length; i += 7) {
      let temp = calendarDays.slice(i, i + 7);

      calendarDaysByWeek.push({ week: i / 7, days: temp });
    }

    return calendarDaysByWeek;
  };

  const handleSelectDay = (year, month, day) => {
    setSelectedDate({ month: month, date: day, year: year });
  };

  const handlePreviousButtonClick = () => {
    setSelectedDate({
      month: selectedDate.month === 0 ? 11 : selectedDate.month - 1,
      date: 1,
      year: selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
    });
  };

  const handleNextButtonClick = () => {
    setSelectedDate({
      month: (selectedDate.month + 1) % 12,
      date: 1,
      year: selectedDate.month === 11 ? selectedDate.year + 1 : selectedDate.year,
    });
  };

  return (
    <Modal
      title="Select Date"
      action="Select"
      open={open}
      onAction={() => onSaveClick(selectedDate)}
      onCancel={handleCancelClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <Button variant="text" prefix={<ArrowBackIcon />} onClick={handlePreviousButtonClick} />
          <Typography variant="heading" color="primary" bold>
            {`${months[selectedDate.month]} ${selectedDate.year}`}
          </Typography>
          <Button variant="text" prefix={<ArrowForwardIcon />} onClick={handleNextButtonClick} />
        </div>
        <table className="table-fixed">
          <thead>
            <tr>
              {daysOfWeek.map((weekday) => (
                <th key={weekday} className="h-10 w-10">
                  <Typography variant="body2" color="secondary">
                    {weekday.slice(0, 1)}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {populateCalendar(selectedDate.year, selectedDate.month).map((week) => (
              <tr key={week.week}>
                {week.days.map((date) => (
                  <td
                    className={`h-10 w-10 rounded-full text-center ${
                      date.date === selectedDate.date
                        ? "bg-sky-500 dark:bg-sky-500"
                        : "md:hover:bg-sky-100 md:hover:dark:bg-slate-800"
                    } cursor-pointer`}
                    key={date.key}
                  >
                    <div onClick={() => handleSelectDay(selectedDate.year, selectedDate.month, date.date)}>
                      <Typography
                        variant="body"
                        color={date.date === selectedDate.date ? "white" : "textPrimary"}
                      >
                        {date.date}
                      </Typography>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default DatePickerModal;
