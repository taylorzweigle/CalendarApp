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
import Tab from "../core/tabs/Tab";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

import { months } from "../components/calendar/Calendar";
import DateInput from "../components/inputs/DateInput";
import DatePickerModal from "../components/modals/DatePickerModal";
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
  const [duration, setDuration] = useState(Actions.SINGLE_DAY);

  const [event, setEvent] = useState("");
  const [user, setUser] = useState("");
  const [tag, setTag] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endYear, setEndYear] = useState("");
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

  const [loading, setLoading] = useState(false);

  const [startMonthPickerModal, setStartMonthPickerModal] = useState(false);
  const [endMonthPickerModal, setEndMonthPickerModal] = useState(false);

  useEffect(() => {
    setStartMonth(selectedDate.month);
    setStartDate(selectedDate.date);
    setStartYear(selectedDate.year);
    setEndMonth(selectedDate.month);
    duration === Actions.MULTIPLE_DAYS ? setEndDate(selectedDate.date + 1) : setEndDate(selectedDate.date);
    setEndYear(selectedDate.year);
  }, [selectedDate, duration]);

  useEffect(() => {
    if (selectedStartTime) {
      setStartHours(selectedStartTime % 12 === 0 ? "12" : (selectedStartTime % 12).toString());
      setStartMinutes("00");
      setStartPeriod(selectedStartTime >= 12 ? "PM" : "AM");
      setEndHours(
        ((parseInt(selectedStartTime) + 1) % 12 === 0
          ? "12"
          : (parseInt(selectedStartTime) + 1) % 12
        ).toString()
      );
      setEndMinutes("00");
      setEndPeriod(parseInt(selectedStartTime) + 1 >= 12 ? "PM" : "AM");
    } else if (selectedStartTime === 0) {
      setStartHours(0);
      setStartMinutes("00");
      setStartPeriod("AM");
      setEndHours(0);
      setEndMinutes("00");
      setEndPeriod("AM");
      setDuration(Actions.SINGLE_DAY);
      setAllDay(true);
    }
  }, [selectedStartTime]);

  const handleOnSaveStartMonthPicker = (selectedDate) => {
    setStartMonth(selectedDate.month);
    setStartDate(selectedDate.date);
    setStartYear(selectedDate.year);

    setEndMonth(
      new Date(
        new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).setDate(
          new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).getDate() + 1
        )
      ).getMonth()
    );
    setEndDate(
      new Date(
        new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).setDate(
          new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).getDate() + 1
        )
      ).getDate()
    );
    setEndYear(
      new Date(
        new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).setDate(
          new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).getDate() + 1
        )
      ).getFullYear()
    );

    setStartMonthPickerModal(false);
  };

  const handleOnSaveEndMonthPicker = (selectedDate) => {
    setEndMonth(selectedDate.month);
    setEndDate(selectedDate.date);
    setEndYear(selectedDate.year);

    setEndMonthPickerModal(false);
  };

  const handleAllDayClick = () => {
    setStartHours(allDay ? "7" : "0");
    setStartMinutes("00");
    setStartPeriod(allDay ? "PM" : "AM");
    setEndHours(allDay ? "9" : "00");
    setEndMinutes("00");
    setEndPeriod(allDay ? "PM" : "AM");

    setAllDay(!allDay);
  };

  const handleOnSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!authUser) {
      return;
    }

    if (loading) {
      return;
    }

    clearErrors();

    const newEvent = {
      event: event,
      user: user,
      tag: tag,
      startTime: new Date(
        `${months[startMonth]} ${startDate}, ${startYear} ${
          startPeriod === "PM"
            ? startHours !== "12"
              ? (parseInt(startHours) + 12).toString()
              : startHours
            : startHours
        }:${startMinutes}:00`
      ),
      endTime:
        duration === Actions.SINGLE_DAY
          ? new Date(
              `${months[startMonth]} ${startDate}, ${startYear} ${
                endPeriod === "PM"
                  ? endHours !== "12"
                    ? (parseInt(endHours) + 12).toString()
                    : endHours
                  : endHours
              }:${endMinutes}:00`
            )
          : new Date(
              `${months[endMonth]} ${endDate}, ${endYear} ${
                endPeriod === "PM"
                  ? endHours !== "12"
                    ? (parseInt(endHours) + 12).toString()
                    : endHours
                  : endHours
              }:${endMinutes}:00`
            ),
      allDay: allDay,
      creationTime: new Date(),
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

      setLoading(false);
    }

    if (json.json) {
      dispatch({ type: Actions.CREATE_EVENT, payload: json.json });

      navigate(-1);

      clearForm();
    }
  };

  const handleOnCancel = () => {
    navigate(-1);

    clearForm();
  };

  const clearForm = () => {
    setDuration(Actions.SINGLE_DAY);
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

  const handleStartPeriodChange = (value) => {
    setStartPeriod(value);

    if (value === "AM") {
      setEndPeriod("AM");
    } else if (value === "PM") {
      setEndPeriod("PM");
    }
  };

  const handleEndPeriodChange = (value) => {
    setEndPeriod(value);

    if (value === "AM") {
      setStartPeriod("AM");
    }
  };

  return (
    <>
      <DatePickerModal
        open={startMonthPickerModal}
        month={startMonth}
        date={startDate}
        year={startYear}
        onSaveClick={handleOnSaveStartMonthPicker}
        onCancelClick={() => setStartMonthPickerModal(false)}
      />
      <DatePickerModal
        open={endMonthPickerModal}
        month={endMonth}
        date={endDate}
        year={endYear}
        minDate={new Date(`${months[startMonth]} ${startDate}, ${startYear}`).setDate(
          new Date(`${months[startMonth]} ${startDate}, ${startYear}`).getDate() + 1
        )}
        onSaveClick={handleOnSaveEndMonthPicker}
        onCancelClick={() => setEndMonthPickerModal(false)}
      />
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
              <div className="h-fit p-4">
                <form onSubmit={handleOnSave}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center">
                      <Tab
                        value="Single Day"
                        selected={duration === Actions.SINGLE_DAY}
                        onClick={() => setDuration(Actions.SINGLE_DAY)}
                      />
                      <Tab
                        value="Multiple Days"
                        selected={duration === Actions.MULTIPLE_DAYS}
                        onClick={() => setDuration(Actions.MULTIPLE_DAYS)}
                      />
                    </div>
                    <DateInput
                      label={duration === Actions.MULTIPLE_DAYS ? "Start Date" : "Date"}
                      month={startMonth}
                      date={startDate}
                      year={startYear}
                      showLabel
                      onClick={() => setStartMonthPickerModal(true)}
                    />
                    {duration === Actions.MULTIPLE_DAYS && (
                      <DateInput
                        label="End Date"
                        month={endMonth}
                        date={endDate}
                        year={endYear}
                        showLabel
                        onClick={() => setEndMonthPickerModal(true)}
                      />
                    )}
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
                      showIcon
                      error={tagError}
                      items={tags}
                      showLabel
                      onChange={(e) => setTag(e.target.value)}
                    />
                    <div className="flex items-center h-12">
                      <Checkbox selected={allDay} onClick={handleAllDayClick} />
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
                          onPeriodChange={(value) => handleStartPeriodChange(value)}
                        />
                        <TimeInput
                          label="End Time"
                          hour={endHours}
                          minutes={endMinutes}
                          period={endPeriod}
                          error={endTimeError}
                          onHourChange={(e) => setEndHours(e.target.value)}
                          onMinutesChange={(e) => setEndMinutes(e.target.value)}
                          onPeriodChange={(value) => handleEndPeriodChange(value)}
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
                  <Button variant="primary" fullWidth loading={loading} onClick={handleOnSave}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateEventPage;
