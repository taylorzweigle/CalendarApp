//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from "../hooks/useEventsContext";

import Button from "../core/button/Button";
import Checkbox from "../core/checkbox/Checkbox";
import DateInput from "../core/dateInput/DateInput";
import SelectInput from "../core/selectInput/SelectInput";
import TextInput from "../core/textInput/TextInput";
import TimeInput from "../core/timeInput/TimeInput";
import Typography from "../core/typography/Typography";

import { months } from "../components/calendar/Calendar";

import { createEvent } from "../api/events";

import { tags } from "../utility/calendars";

const MobileFormPage = () => {
  const navigate = useNavigate();

  const { user: authUser } = useAuthContext();

  const { dispatch } = useEventsContext();

  const [selectedDate] = useState({
    month: new Date().getMonth(),
    date: new Date().getDate(),
    year: new Date().getFullYear(),
    weekday: new Date().getDay(),
  });

  const [allDay, setAllDay] = useState(false);

  const [event, setEvent] = useState("");
  const [user, setUser] = useState("");
  const [tag, setTag] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [startHours, setStartHours] = useState("");
  const [startMinutes, setStartMinutes] = useState("");
  const [startPeriod, setStartPeriod] = useState("");
  const [endHours, setEndHours] = useState("");
  const [endMinutes, setEndMinutes] = useState("");
  const [endPeriod, setEndPeriod] = useState("");

  const [eventError, setEventError] = useState("");
  const [userError, setUserError] = useState("");
  const [tagError, setTagError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  useEffect(() => {
    setMonth(months[selectedDate.month]);
    setDate(selectedDate.date);
    setYear(selectedDate.year);
  }, [selectedDate]);

  const handleOnSave = async (e) => {
    e.preventDefault();

    if (!authUser) {
      return;
    }

    clearErrors();

    const newEvent = {
      event: event,
      user: user,
      tag: tag,
      startTime: allDay
        ? new Date(`${month} ${date}, ${year}`)
        : new Date(
            `${month} ${date}, ${year} ${
              startPeriod === "PM" ? (startHours !== "12" ? (parseInt(startHours) + 12).toString() : startHours) : startHours
            }:${startMinutes}:00`
          ),
      endTime: allDay
        ? new Date(`${month} ${date}, ${year}`)
        : new Date(
            `${month} ${date}, ${year} ${
              endPeriod === "PM" ? (endHours !== "12" ? (parseInt(endHours) + 12).toString() : endHours) : endHours
            }:${endMinutes}:00`
          ),
    };

    const json = await createEvent(newEvent, authUser.token);

    if (json.error) {
      if (json.error.includes("event")) {
        setEventError("Event is required");
      }
      if (json.error.includes("user")) {
        setUserError("User is required");
      }
      if (json.error.includes("tag")) {
        setTagError("Tag is required");
      }
      if (json.error.includes("startTime")) {
        setStartTimeError("Start Time is required");
      }
      if (json.error.includes("endTime")) {
        setEndTimeError("End Time is required");
      }
    }

    if (json.json) {
      dispatch({ type: Actions.CREATE_EVENT, payload: json.json });

      navigate("/");

      clearForm();
    }
  };

  const handleOnCancel = () => {
    navigate("/");

    clearForm();
  };

  const clearForm = () => {
    setAllDay(false);
    setEvent("");
    setUser("");
    setTag("");
    setStartHours("");
    setStartMinutes("");
    setStartPeriod("");
    setEndHours("");
    setEndMinutes("");
    setEndPeriod("");

    clearErrors();
  };

  const clearErrors = () => {
    setEventError("");
    setUserError("");
    setTagError("");
    setStartTimeError("");
    setEndTimeError("");
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-slate-800 p-4">
      <Typography variant="heading">Add Event</Typography>
      <form onSubmit={handleOnSave}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Checkbox selected={allDay} onClick={() => setAllDay(!allDay)} />
          </div>
          <DateInput
            label="Date"
            month={month}
            date={date}
            year={year}
            onMonthChange={(e) => setMonth(e.target.value)}
            onDateChange={(e) => setDate(e.target.value)}
            onYearChange={(e) => setYear(e.target.value)}
          />
          <TextInput label="Event" error={eventError} value={event} showLabel onChange={(e) => setEvent(e.target.value)} />
          <SelectInput
            label="User"
            value={user}
            error={userError}
            items={["", "Husband", "Wife", "Us", "Calendar"]}
            showLabel
            onChange={(e) => setUser(e.target.value)}
          />
          <SelectInput
            label="Tag"
            value={tag}
            error={tagError}
            items={tags}
            showLabel
            onChange={(e) => setTag(e.target.value)}
          />
          {!allDay && (
            <>
              <TimeInput
                label="Start Time"
                hour={startHours}
                minutes={startMinutes}
                period={startPeriod}
                error={startTimeError}
                onHourChange={(e) => setStartHours(e.target.value)}
                onMinutesChange={(e) => setStartMinutes(e.target.value)}
                onPeriodChange={(e) => setStartPeriod(e.target.value)}
              />
              <TimeInput
                label="End Time"
                hour={endHours}
                minutes={endMinutes}
                period={endPeriod}
                error={endTimeError}
                onHourChange={(e) => setEndHours(e.target.value)}
                onMinutesChange={(e) => setEndMinutes(e.target.value)}
                onPeriodChange={(e) => setEndPeriod(e.target.value)}
              />
            </>
          )}
        </div>
      </form>
      <div className="flex flex-col gap-4">
        <Button variant="default" fullWidth onClick={handleOnCancel}>
          Cancel
        </Button>
        <Button variant="primary" fullWidth onClick={handleOnSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default MobileFormPage;
