//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import * as Actions from "../../actions";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";
import { useSelectedStartTimeContext } from "../../hooks/useSelectedStartTimeContext";

import Button from "../../core/button/Button";
import Label from "../../core/label/Label";
import Typography from "../../core/typography/Typography";

import DatePickerModal from "../modals/DatePickerModal";
import { months, daysOfWeek } from "../calendar/Calendar";
import Timeline from "../timeline/Timeline";

import { calendars } from "../../utility/calendars";

const TimelineLayout = ({ data }) => {
  const navigate = useNavigate();

  const { selectedDate, dispatchSelectedDate } = useSelectedDateContext();
  const { dispatchSelectedStartTime } = useSelectedStartTimeContext();

  const today = new Date();

  const [datePicker, setDatePicker] = useState(false);

  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    let temp = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const eventStartTime = data[i].startTime;

        if (
          new Date(eventStartTime).getDate() === selectedDate.date &&
          new Date(eventStartTime).getMonth() === selectedDate.month &&
          new Date(eventStartTime).getFullYear() === selectedDate.year
        ) {
          temp.push(data[i]);
        }
      }
    }

    setDayData(temp);
  }, [data, selectedDate]);

  const getMonthLength = (year, month) => 32 - new Date(year, month, 32).getDate();

  const handleSelectDate = (date) => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: date.month,
        date: date.date,
        year: date.year,
        weekday: new Date(`${months[date.month]} ${date.date} ${date.year}`).getDay(),
      },
    });

    setDatePicker(false);
  };

  const handleTodayClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: today.getMonth(),
        date: today.getDate(),
        year: today.getFullYear(),
        weekday: today.getDay(),
      },
    });
  };

  const handlePreviousButtonClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month:
          selectedDate.date === 1
            ? selectedDate.month === 0
              ? 11
              : selectedDate.month - 1
            : selectedDate.month,
        date:
          selectedDate.date === 1
            ? getMonthLength(selectedDate.year, selectedDate.month - 1)
            : selectedDate.date - 1,
        year:
          selectedDate.date === 1 && selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
        weekday: new Date(
          selectedDate.date === 1 && selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
          selectedDate.date === 1
            ? selectedDate.month === 0
              ? 11
              : selectedDate.month - 1
            : selectedDate.month,
          selectedDate.date === 1
            ? getMonthLength(selectedDate.year, selectedDate.month - 1)
            : selectedDate.date - 1
        ).getDay(),
      },
    });
  };

  const handleNextButtonClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month:
          selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month)
            ? (selectedDate.month + 1) % 12
            : selectedDate.month,
        date:
          selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month)
            ? 1
            : selectedDate.date + 1,
        year:
          selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month) &&
          selectedDate.month === 11
            ? selectedDate.year + 1
            : selectedDate.year,
        weekday: new Date(
          selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month) &&
          selectedDate.month === 11
            ? selectedDate.year + 1
            : selectedDate.year,
          selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month)
            ? (selectedDate.month + 1) % 12
            : selectedDate.month,
          selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month)
            ? 1
            : selectedDate.date + 1
        ).getDay(),
      },
    });
  };

  const handleHourClick = (hour) => {
    dispatchSelectedStartTime({ type: Actions.SET_SELECTED_START_TIME, payload: hour });

    navigate("/event");
  };

  return (
    <>
      <DatePickerModal
        open={datePicker}
        month={selectedDate.month}
        date={selectedDate.date}
        year={selectedDate.year}
        onSaveClick={handleSelectDate}
        onCancelClick={() => setDatePicker(false)}
      />
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 pt-4 pl-4 pr-4 md:pt-0 md:pl-0 md:pr-0">
          <div className="flex flex-row justify-between md:justify-start items-end gap-4 h-16">
            <div className="flex flex-col gap-0">
              <div className="flex flex-row items-center gap-2 h-10">
                <Typography variant="body2" color="secondary">
                  {daysOfWeek[selectedDate.weekday]}
                </Typography>
                {selectedDate.month === today.getMonth() &&
                  selectedDate.date === today.getDate() &&
                  selectedDate.year === today.getFullYear() && (
                    <Label size="small" variant="primary">
                      Today
                    </Label>
                  )}
                {dayData.length > 0 && (
                  <Label size="small" variant="default">
                    {`${dayData.length} Event${dayData.length > 1 ? "s" : ""}`}
                  </Label>
                )}
              </div>
              <Typography variant="title" color="primary">{`${months[selectedDate.month]} ${
                selectedDate.date
              }, ${selectedDate.year}`}</Typography>
            </div>
            <Button variant="default" prefix={<ArrowDropDownIcon />} onClick={() => setDatePicker(true)} />
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
          <Timeline data={dayData} calendars={calendars} onHourClick={handleHourClick} />
        </div>
      </div>
    </>
  );
};

export default TimelineLayout;
