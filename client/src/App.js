//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "./actions";

import { useEventsContext } from "./hooks/useEventsContext";

import { getEvents } from "./api/events";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TodayIcon from "@mui/icons-material/Today";

import Button from "./core/button/Button";
import Card from "./core/card/Card";
import Typography from "./core/typography/Typography";

import Calendar, { months } from "./components/calendar/Calendar";
import DetailsLayout from "./components/layouts/DetailsLayout";
import EventFormModal from "./components/modals/EventFormModal";
import HeaderLayout from "./components/layouts/HeaderLayout";
import LegendLayout from "./components/layouts/LegendLayout";
import MonthPicker from "./components/monthPicker/MonthPicker";

import { calendars } from "./utility/calendars";
import { filterEvents } from "./utility/utility";

const App = () => {
  const today = new Date();

  const { events, dispatch } = useEventsContext();

  const [addModal, setAddModal] = useState(false);
  const [monthPicker, setMonthPicker] = useState(false);

  const [visibleCalendars, setVisibleCalendars] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();

      dispatch({ type: Actions.GET_EVENTS, payload: events });
    };

    fetchEvents();
  }, [dispatch]);

  useEffect(() => {
    setVisibleCalendars(calendars.map((calendar) => calendar.user));
  }, []);

  const [selectedDate, setSelectedDate] = useState({
    month: today.getMonth(),
    date: today.getDate(),
    year: today.getFullYear(),
    weekday: today.getDay(),
  });

  const handleMonthPickerChange = (month) => {
    let monthIndex = 0;

    for (let i = 0; i < months.length; i++) {
      if (month === months[i]) {
        monthIndex = i;
      }
    }

    setSelectedDate({
      month: monthIndex,
      date: 1,
      year: selectedDate.year,
      weekday: new Date(selectedDate.year, selectedDate.month, 1).getDay(),
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
      <EventFormModal
        open={addModal}
        type="Add"
        selectedDate={selectedDate}
        onSaveClick={() => setAddModal(false)}
        onCancelClick={() => setAddModal(false)}
      />
      <Card border>
        <div className="grid grid-cols-12 m-auto w-full">
          <div className="sm:col-span-12 md:col-span-3 border-r border-slate-300 dark:border-slate-600">
            <div className="grid grid-cols-12 m-auto w-full">
              <div className="sm:col-span-12 md:col-span-12">
                <HeaderLayout user="Taylor Zweigle" onAddEventClick={() => setAddModal(true)} />
              </div>
              <div className="sm:col-span-12 md:col-span-12">
                <DetailsLayout
                  data={filterEvents(visibleCalendars, events)}
                  calendars={calendars}
                  selectedDate={selectedDate}
                />
              </div>
              <div className="sm:col-span-12 md:col-span-12">
                <LegendLayout onClick={handleLegendChange} />
              </div>
            </div>
          </div>
          <div className="sm:col-span-12 md:col-span-9 flex flex-col gap-4 p-8">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-4 items-center">
                <Typography variant="title">{`${months[selectedDate.month]} ${selectedDate.year}`}</Typography>
                <div>
                  <Button prefix={<ArrowDropDownIcon />} onClick={() => setMonthPicker(!monthPicker)} />
                  <div className={`absolute ${monthPicker ? "block" : "hidden"}`}>
                    <Card border>
                      <MonthPicker selectedMonth={selectedDate.month} onChange={(month) => handleMonthPickerChange(month)} />
                    </Card>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Button prefix={<TodayIcon />} onClick={() => handleTodayClick()} />
                <Button prefix={<ArrowBackIcon />} onClick={() => handlePreviousButtonClick()} />
                <Button prefix={<ArrowForwardIcon />} onClick={() => handleNextButtonClick()} />
              </div>
            </div>
            <Calendar
              data={filterEvents(visibleCalendars, events)}
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
};

export default App;
