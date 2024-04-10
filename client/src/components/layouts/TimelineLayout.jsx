//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import * as Actions from "../../actions";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";
import { useSelectedStartTimeContext } from "../../hooks/useSelectedStartTimeContext";

import Button from "../../core/button/Button";
import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";
import Timeline from "../timeline/Timeline";

import { calendars } from "../../utility/calendars";

const TimelineLayout = ({ data }) => {
  const navigate = useNavigate();

  const { selectedDate, dispatchSelectedDate } = useSelectedDateContext();
  const { dispatchSelectedStartTime } = useSelectedStartTimeContext();

  const today = new Date();

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

  const handleTodayClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: { month: today.getMonth(), date: today.getDate(), year: today.getFullYear(), weekday: today.getDay() },
    });
  };

  const handlePreviousButtonClick = () => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: selectedDate.date === 1 ? (selectedDate.month === 0 ? 11 : selectedDate.month - 1) : selectedDate.month,
        date: selectedDate.date === 1 ? getMonthLength(selectedDate.year, selectedDate.month - 1) : selectedDate.date - 1,
        year: selectedDate.date === 1 && selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
        weekday: new Date(selectedDate.year, selectedDate.month - 1, 1).getDay(),
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
        date: selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month) ? 1 : selectedDate.date + 1,
        year:
          selectedDate.date === getMonthLength(selectedDate.year, selectedDate.month) && selectedDate.month === 11
            ? selectedDate.year + 1
            : selectedDate.year,
        weekday: new Date(selectedDate.year, selectedDate.month + 1, 1).getDay(),
      },
    });
  };

  const handleHourClick = (hour) => {
    dispatchSelectedStartTime({ type: Actions.SET_SELECTED_START_TIME, payload: hour });

    navigate("/event");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 pt-4 pl-4 pr-4 md:pt-0 md:pl-0 md:pr-0">
        <div className="flex flex-row justify-between md:justify-start items-center gap-4 h-12">
          <Typography variant="title">{`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`}</Typography>
          {dayData.length > 0 && (
            <div className="flex flex-row justify-center items-center rounded-full w-24 h-10 bg-sky-200 dark:bg-sky-600">
              <Typography variant="body1">{`${dayData.length} ${dayData.length > 1 ? "Events" : "Event"}`}</Typography>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between sm:justify-between md:gap-4 items-center">
          <Button variant="default" prefix={<TodayIcon />} onClick={() => handleTodayClick()}>
            Today
          </Button>
          <div className="flex flex-row gap-4 items-center">
            <Button variant="default" prefix={<ArrowBackIcon />} onClick={() => handlePreviousButtonClick()} />
            <Button variant="default" prefix={<ArrowForwardIcon />} onClick={() => handleNextButtonClick()} />
          </div>
        </div>
      </div>
      <div className="p-4 md:p-0">
        <Timeline data={dayData} calendars={calendars} onHourClick={handleHourClick} />
      </div>
    </>
  );
};

export default TimelineLayout;
