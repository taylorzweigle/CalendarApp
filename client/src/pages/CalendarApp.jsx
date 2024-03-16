//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { useSelectedDateContext } from "../hooks/useSelectedDateContext";

import { getEvents } from "../api/events";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import Typography from "../core/typography/Typography";

import Calendar, { months } from "../components/calendar/Calendar";
import DetailsLayout from "../components/layouts/DetailsLayout";
import HeaderLayout from "../components/layouts/HeaderLayout";
import LegendLayout from "../components/layouts/LegendLayout";
import MonthPickerModal from "../components/modals/MonthPickerModal";

import { calendars } from "../utility/calendars";
import { filterEvents } from "../utility/utility";

const CalendarApp = () => {
  const { user } = useAuthContext();
  const { events, dispatch } = useEventsContext();
  const { selectedDate, dispatchSelectedDate } = useSelectedDateContext();

  const today = new Date();

  const [monthPicker, setMonthPicker] = useState(false);

  const [visibleCalendars, setVisibleCalendars] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents(user.token);

      dispatch({ type: Actions.GET_EVENTS, payload: events.json });
    };

    if (user) {
      fetchEvents();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setVisibleCalendars(calendars.map((calendar) => calendar.user));
  }, []);

  const handleMonthPickerChange = (month) => {
    let monthIndex = 0;

    for (let i = 0; i < months.length; i++) {
      if (month === months[i]) {
        monthIndex = i;
      }
    }

    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: {
        month: monthIndex,
        date: 1,
        year: selectedDate.year,
        weekday: new Date(selectedDate.year, selectedDate.month, 1).getDay(),
      },
    });

    setMonthPicker(false);
  };

  const handleLegendChange = (calendar) => {
    let calendars = [...visibleCalendars];

    if (calendar.selected) {
      if (!calendars.includes(calendar.label)) {
        calendars.push(calendar.label);
      }
    } else {
      if (calendars.includes(calendar.label)) {
        const index = calendars.indexOf(calendar.label);

        calendars.splice(index, 1);
      }
    }

    setVisibleCalendars(calendars);
  };

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
        month: selectedDate.month === 0 ? 11 : selectedDate.month - 1,
        date: 1,
        year: selectedDate.month === 0 ? selectedDate.year - 1 : selectedDate.year,
        weekday: new Date(selectedDate.year, selectedDate.month - 1, 1).getDay(),
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
      },
    });
  };

  const handleSelectDay = (year, month, day) => {
    dispatchSelectedDate({
      type: Actions.SET_SELECTED_DATE,
      payload: { month: month, date: day, year: year, weekday: new Date(year, month, day).getDay() },
    });
  };

  return (
    <>
      <MonthPickerModal
        open={monthPicker}
        selectedMonth={selectedDate.month}
        onSaveClick={(month) => handleMonthPickerChange(month)}
        onCancelClick={() => setMonthPicker(false)}
      />
      <Card border>
        <div className="grid grid-cols-12 m-auto w-full">
          <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600">
            <div className="grid grid-cols-12 m-auto w-full">
              <div className="col-span-12">
                <HeaderLayout user="Taylor Zweigle" />
              </div>
              <div className="col-span-12">
                <DetailsLayout data={filterEvents(visibleCalendars, events)} calendars={calendars} />
              </div>
              <div className="hidden md:block col-span-12">
                <LegendLayout onClick={handleLegendChange} />
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-9 flex flex-col gap-0 md:gap-4 p-0 md:p-8">
            <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center gap-4 sm:gap-8 p-4 md:p-0">
              <div className="flex flex-row justify-between sm:justify-between md:gap-4 items-center">
                <Typography variant="title">{`${months[selectedDate.month]} ${selectedDate.year}`}</Typography>
                <Button variant="default" prefix={<ArrowDropDownIcon />} onClick={() => setMonthPicker(!monthPicker)} />
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
              <Calendar
                data={filterEvents(visibleCalendars, events)}
                calendars={calendars}
                today={today}
                onSelectDay={handleSelectDay}
              />
            </div>
            <div className="block md:hidden col-span-12">
              <LegendLayout onClick={handleLegendChange} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CalendarApp;
