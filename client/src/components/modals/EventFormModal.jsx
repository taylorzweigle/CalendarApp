//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useEventsContext } from "../../hooks/useEventsContext";

import Checkbox from "../../core/checkbox/Checkbox";
import Modal from "../../core/modal/Modal";
import SelectInput from "../../core/selectInput/SelectInput";
import TextInput from "../../core/textInput/TextInput";
import TimeInput from "../../core/timeInput/TimeInput";
import Typography from "../../core/typography/Typography";

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
  const [date, setDate] = useState("");
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

  const defaultDate = `${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`;

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  useEffect(() => {
    if (eventDetails) {
      setAllDay(eventDetails.startTime === eventDetails.endTime ? true : false);

      setEvent(eventDetails.event);
      setUser(eventDetails.user);
      setTag(eventDetails.tag);
      setDate(
        `${months[new Date(eventDetails.startTime).getMonth()]} ${new Date(eventDetails.startTime).getDate()}, ${new Date(
          eventDetails.startTime
        ).getFullYear()}`
      );
      setStartHours(
        new Date(eventDetails.startTime).getHours() % 12 === 0
          ? "12"
          : (new Date(eventDetails.startTime).getHours() % 12).toString()
      );
      setStartMinutes(new Date(eventDetails.startTime).getMinutes() === 0 ? "00" : "30");
      setStartPeriod(new Date(eventDetails.startTime).getHours() >= 12 ? "PM" : "AM");
      setEndHours(
        new Date(eventDetails.endTime).getHours() % 12 === 0
          ? "12"
          : (new Date(eventDetails.endTime).getHours() % 12).toString()
      );
      setEndMinutes(new Date(eventDetails.endTime).getMinutes() === 0 ? "00" : "30");
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
        ? new Date(date)
        : new Date(
            `${date} ${
              startPeriod === "PM" ? (startHours !== "12" ? (parseInt(startHours) + 12).toString() : startHours) : startHours
            }:${startMinutes}:00`
          ),
      endTime: allDay
        ? new Date(date)
        : new Date(
            `${date} ${
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
        ? new Date(date)
        : new Date(
            `${date} ${
              startPeriod === "PM" ? (startHours !== "12" ? (parseInt(startHours) + 12).toString() : startHours) : startHours
            }:${startMinutes}:00`
          ),
      endTime: allDay
        ? new Date(date)
        : new Date(
            `${date} ${
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
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-0">
              <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
                Date
              </Typography>
              <Typography variant="body1">{date}</Typography>
            </div>
            <Checkbox selected={allDay} onClick={() => setAllDay(!allDay)} />
          </div>
          <TextInput label="Event" error={eventError} value={event} onChange={(e) => setEvent(e.target.value)} />
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
