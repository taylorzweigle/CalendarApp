//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import IconButton from "../../core/iconButton/IconButton";
import Modal from "../../core/modal/Modal";
import Typography from "../../core/typography/Typography";

import { months, daysOfWeek } from "../calendar/Calendar";

const DatePickerModal = ({ open, month, date, year, minDate, onSaveClick, onCancelClick }) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState({});
  const [minimumDate, setMinimumDate] = useState({});

  const getMonthLength = (year, month) => 32 - new Date(year, month, 32).getDate();

  const getDayOfWeekOfMonthStart = (year, month) => new Date(year, month).getDay();

  useEffect(() => {
    setSelectedDate({ month: month, date: date, year: year });
  }, [month, date, year]);

  useEffect(() => {
    setMinimumDate(
      minDate
        ? {
            month: new Date(minDate).getMonth(),
            date: new Date(minDate).getDate(),
            year: new Date(minDate).getFullYear(),
          }
        : {
            month: new Date(1970, 0, 1).getMonth(),
            date: new Date(1970, 0, 1).getDate(),
            year: new Date(1970, 0, 1).getFullYear(),
          }
    );
  }, [minDate]);

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
        key: `${(month - 1).toString().length === 1 ? "0" : ""}${month === 0 ? 11 : month - 1}${
          (prevMonthLength - i).toString().length === 1 ? "0" : ""
        }${prevMonthLength - i}${month === 0 ? year - 1 : year}`,
        month: month === 0 ? 11 : month - 1,
        day: prevMonthLength - i,
        year: month === 0 ? year - 1 : year,
      });
    }

    for (let i = 1; i <= monthLength; i++) {
      calendarDays.push({
        key: `${month.toString().length === 1 ? "0" : ""}${month}${
          i.toString().length === 1 ? "0" : ""
        }${i}${year}`,
        month: month,
        day: i,
        year: year,
      });
    }

    remainingDays = 7 - (calendarDays.length % 7);

    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        calendarDays.push({
          key: `${(month + 1).toString().length === 1 ? "0" : ""}${month + 1 > 11 ? 0 : month + 1}${
            (i + 1).toString().length === 1 ? "0" : ""
          }${i + 1}${month === 11 ? year + 1 : year}`,
          month: month + 1 > 11 ? 0 : month + 1,
          day: i + 1,
          year: month === 11 ? year + 1 : year,
        });
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

  const selectDate = (date) => {
    return (
      date.day === selectedDate.date && date.month === selectedDate.month && date.year === selectedDate.year
    );
  };

  const todayDate = (date) => {
    return (
      date.day === today.getDate() &&
      selectedDate.month === today.getMonth() &&
      selectedDate.year === today.getFullYear()
    );
  };

  const disableDate = (date) => {
    return (
      new Date(date.year, date.month, date.day) -
        new Date(minimumDate.year, minimumDate.month, minimumDate.date) <
      0
    );
  };

  return (
    <Modal
      title="Select Date"
      action="Select"
      resetAction="Today"
      open={open}
      onAction={() => onSaveClick(selectedDate)}
      onResetAction={() =>
        setSelectedDate({
          month: new Date().getMonth(),
          date: new Date().getDate(),
          year: new Date().getFullYear(),
        })
      }
      onCancel={handleCancelClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <IconButton
            color={minDate ? "disabled" : "default"}
            onClick={minDate ? null : handlePreviousButtonClick}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="heading" color="primary" bold>
            {`${months[selectedDate.month]} ${selectedDate.year}`}
          </Typography>
          <IconButton onClick={handleNextButtonClick}>
            <ArrowForwardIcon />
          </IconButton>
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
                  <td className="text-center align-middle" key={date.key}>
                    {date.month === selectedDate.month && (
                      <div
                        className={`inline-flex justify-center items-center h-11 w-11 rounded-full ${
                          selectDate(date)
                            ? "bg-sky-500 dark:bg-sky-500 cursor-pointer"
                            : todayDate(date)
                            ? "border-2 border-sky-500 dark:border-sky-500 cursor-pointer"
                            : disableDate(date)
                            ? ""
                            : "active:bg-sky-200 active:dark:bg-slate-700 md:hover:bg-sky-200 md:hover:dark:bg-slate-700 cursor-pointer"
                        }`}
                        onClick={
                          disableDate(date) ? null : () => handleSelectDay(date.year, date.month, date.day)
                        }
                      >
                        <Typography
                          variant="body"
                          color={selectDate(date) ? "white" : disableDate(date) ? "secondary" : "primary"}
                        >
                          {date.day}
                        </Typography>
                      </div>
                    )}
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
