//Taylor Zweigle, 2025
import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import * as Actions from "../../actions";

import { useCalendarsContext } from "../../hooks/useCalendarsContext";
import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import Button from "../../core/button/Button";
import Typography from "../../core/typography/Typography";

import Calendar, { months } from "../calendar/Calendar";
import MonthPickerModal from "../modals/MonthPickerModal";

const CalendarLayout = ({ data }) => {
  const { calendars } = useCalendarsContext();
  const { selectedDate, dispatchSelectedDate } = useSelectedDateContext();

  const today = new Date();

  const [monthPicker, setMonthPicker] = useState(false);

  const handleTodayClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear(),
        weekday: today.getDay(),
        hour: "",
        minute: "",
        period: "",
      },
    });
  };

  const handleSelectDay = (year, month, day) => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: month,
        date: day,
        year: year,
        weekday: new Date(year, month, day).getDay(),
        hour: "",
        minute: "",
        period: "",
      },
    });
  };

  const handlePreviousButtonClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: selectedDate.month === 0 ? 11 : selectedDate.month - 1,
        date: 1,
        year: selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
        weekday: new Date(selectedDate.year, selectedDate.month - 1, 1).getDay(),
        hour: "",
        minute: "",
        period: "",
      },
    });
  };

  const handleNextButtonClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: (selectedDate.month + 1) % 12,
        date: 1,
        year: selectedDate.month === 11 ? selectedDate.year + 1 : selectedDate.year,
        weekday: new Date(selectedDate.year, selectedDate.month + 1, 1).getDay(),
        hour: "",
        minute: "",
        period: "",
      },
    });
  };

  const handleMonthPickerChange = (selectedMonth) => {
    let monthIndex = 0;

    for (let i = 0; i < months.length; i++) {
      if (selectedMonth.month === months[i]) {
        monthIndex = i;
      }
    }

    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: monthIndex,
        date: 1,
        year: selectedMonth.year,
        weekday: new Date(selectedMonth.year, monthIndex, 1).getDay(),
        hour: "",
        minute: "",
        period: "",
      },
    });

    setMonthPicker(false);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <MonthPickerModal
        open={monthPicker}
        month={selectedDate.month}
        year={selectedDate.year}
        onSaveClick={(selectedMonth) => handleMonthPickerChange(selectedMonth)}
        onCancelClick={() => setMonthPicker(false)}
      />
      <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 pt-4 pl-4 pr-4 md:pt-0 md:pl-0 md:pr-0">
        <div className="flex flex-row justify-between md:justify-start md:gap-4 items-center w-full">
          <Typography variant="title" color="primary">
            {`${months[selectedDate.month]} ${selectedDate.year}`}
          </Typography>
          <Button variant="default" prefix={<ArrowDropDownIcon />} onClick={() => setMonthPicker(true)} />
        </div>
        <div className="flex flex-row justify-between sm:justify-between md:gap-4 items-center">
          <Button variant="default" prefix={<TodayIcon />} onClick={() => handleTodayClick()}>
            Today
          </Button>
          <div className="flex flex-row gap-4 items-center">
            <Button
              variant="default"
              prefix={<ArrowBackIcon />}
              onClick={() => handlePreviousButtonClick()}
            />
            <Button
              variant="default"
              prefix={<ArrowForwardIcon />}
              onClick={() => handleNextButtonClick()}
            />
          </div>
        </div>
      </div>
      <div className="p-0">
        <Calendar data={data} calendars={calendars} today={today} onSelectDay={handleSelectDay} />
      </div>
    </div>
  );
};

export default CalendarLayout;
