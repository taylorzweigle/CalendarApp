//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { useSelectedDateContext } from "../hooks/useSelectedDateContext";
import { useSelectedStartTimeContext } from "../hooks/useSelectedStartTimeContext";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import Checkbox from "../core/checkbox/Checkbox";
import SelectInput from "../core/selectInput/SelectInput";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

import { months } from "../components/calendar/Calendar";
import DateInput from "../components/inputs/DateInput";
import TimeInput from "../components/inputs/TimeInput";

import { createEvent } from "../api/events";

import { tags } from "../utility/calendars";

const CreateEventPage = () => {
  const navigate = useNavigate();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useEventsContext();
  const { selectedDate } = useSelectedDateContext();
  const { selectedStartTime } = useSelectedStartTimeContext();

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

  useEffect(() => {
    if (selectedStartTime) {
      setStartHours(selectedStartTime % 12 === 0 ? "12" : (selectedStartTime % 12).toString());
      setStartMinutes("00");
      setStartPeriod(selectedStartTime >= 12 ? "PM" : "AM");
      setEndHours(((parseInt(selectedStartTime) + 1) % 12 === 0 ? "12" : (parseInt(selectedStartTime) + 1) % 12).toString());
      setEndMinutes("00");
      setEndPeriod(parseInt(selectedStartTime) + 1 >= 12 ? "PM" : "AM");
    } else if (selectedStartTime === 0) {
      setStartHours(0);
      setStartMinutes("00");
      setStartPeriod("AM");
      setEndHours(0);
      setEndMinutes("00");
      setEndPeriod("AM");
      setAllDay(true);
    }
  }, [selectedStartTime]);

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
    <div className="w-full sm:w-128 m-auto">
      <Card border>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center border-b border-slate-300 dark:border-slate-600 pt-4 pb-4">
            <div className="flex flex-1 pl-4">
              <Button variant="text" prefix={<ChevronLeftIcon />} onClick={handleOnCancel}>
                Back
              </Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Typography variant="heading">Add Event</Typography>
            </div>
            <div className="flex flex-1">&nbsp;</div>
          </div>
          <div className="flex flex-col">
            <div className="p-4">
              <form onSubmit={handleOnSave}>
                <div className="flex flex-col gap-4">
                  <DateInput
                    label="Date"
                    month={month}
                    date={date}
                    year={year}
                    onMonthChange={(e) => setMonth(e.target.value)}
                    onDateChange={(e) => setDate(e.target.value)}
                    onYearChange={(e) => setYear(e.target.value)}
                  />
                  <TextInput
                    label="Event"
                    error={eventError}
                    value={event}
                    showLabel
                    onChange={(e) => setEvent(e.target.value)}
                  />
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
                  <div className="pt-2 pb-2">
                    <Checkbox selected={allDay} onClick={() => setAllDay(!allDay)} />
                  </div>
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
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 border-t p-4 border-slate-300 dark:border-slate-600">
              <div>
                <Button variant="default" fullWidth onClick={handleOnCancel}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button variant="primary" fullWidth onClick={handleOnSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateEventPage;
