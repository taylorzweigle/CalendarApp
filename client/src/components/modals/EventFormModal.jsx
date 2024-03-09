//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useEventsContext } from "../../hooks/useEventsContext";

import Checkbox from "../../core/checkbox/Checkbox";
import DateInput from "../../core/dateInput/DateInput";
import Modal from "../../core/modal/Modal";
import SelectInput from "../../core/selectInput/SelectInput";
import TextInput from "../../core/textInput/TextInput";
import TimeInput from "../../core/timeInput/TimeInput";

import { months } from "../calendar/Calendar";

import { getEvents, createEvent, deleteEvent, updateEvent } from "../../api/events";

import { tags } from "../../utility/calendars";

const EventFormModal = ({ open, type, eventDetails, selectedDate, onSaveClick, onDeleteClick, onCancelClick }) => {
  const { user: authUser } = useAuthContext();

  const { dispatch } = useEventsContext();

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
    if (eventDetails) {
      setAllDay(eventDetails.startTime === eventDetails.endTime ? true : false);

      setEvent(eventDetails.event);
      setUser(eventDetails.user);
      setTag(eventDetails.tag);
      setMonth(months[new Date(eventDetails.startTime).getMonth()]);
      setDate(new Date(eventDetails.startTime).getDate());
      setYear(new Date(eventDetails.startTime).getFullYear());
      setStartHours(
        new Date(eventDetails.startTime).getHours() % 12 === 0
          ? "12"
          : (new Date(eventDetails.startTime).getHours() % 12).toString()
      );
      setStartMinutes(new Date(eventDetails.startTime).getMinutes());
      setStartPeriod(new Date(eventDetails.startTime).getHours() >= 12 ? "PM" : "AM");
      setEndHours(
        new Date(eventDetails.endTime).getHours() % 12 === 0
          ? "12"
          : (new Date(eventDetails.endTime).getHours() % 12).toString()
      );
      setEndMinutes(new Date(eventDetails.endTime).getMinutes());
      setEndPeriod(new Date(eventDetails.endTime).getHours() >= 12 ? "PM" : "AM");
    }
  }, [eventDetails]);

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

      clearForm();

      onSaveClick();
    }
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();

    if (!authUser) {
      return;
    }

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

    const json = await updateEvent(eventDetails, newEvent, authUser.token);

    if (json.json) {
      const events = await getEvents(authUser.token);

      if (events.json) {
        dispatch({ type: Actions.GET_EVENTS, payload: events.json });
      }

      clearForm();

      onSaveClick();
    }
  };

  const handleOnDelete = async () => {
    const json = await deleteEvent(eventDetails, authUser.token);

    if (json.json) {
      dispatch({ type: Actions.DELETE_EVENT, payload: json.json });

      onDeleteClick();
    }
  };

  const handleOnCancel = () => {
    clearForm();

    onCancelClick();
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
    <Modal
      title={`${type} Calendar Event`}
      open={open}
      action={type === "Edit" ? "Update" : "Save"}
      secondaryAction={type === "Edit" ? "Delete" : ""}
      onAction={type === "Edit" ? handleOnUpdate : handleOnSave}
      onSecondaryAction={type === "Edit" ? handleOnDelete : null}
      onClose={handleOnCancel}
    >
      <form onSubmit={type === "Edit" ? handleOnUpdate : handleOnSave}>
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
    </Modal>
  );
};

export default EventFormModal;
