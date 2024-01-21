//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "../../actions";

import { useEventsContext } from "../../hooks/useEventsContext";

import Checkbox from "../../core/checkbox/Checkbox";
import Modal from "../../core/modal/Modal";
import SelectInput from "../../core/selectInput/SelectInput";
import TextInput from "../../core/textInput/TextInput";
import TimeInput from "../../core/timeInput/TimeInput";
import Typography from "../../core/typography/Typography";

import { createEvent } from "../../api/events";

const AddNewEventModal = ({ open, selectedDate, onSaveClick, onCancelClick }) => {
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const defaultDate = `${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`;

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  const handleOnSave = async (e) => {
    e.preventDefault();

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

    const json = await createEvent(newEvent);

    if (json) {
      dispatch({ type: Actions.CREATE_EVENT, payload: json });

      clearForm();

      onSaveClick();
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
    setDate("");
    setStartHours("");
    setStartMinutes("");
    setStartPeriod("");
    setEndHours("");
    setEndMinutes("");
    setEndPeriod("");
  };

  return (
    <Modal title="Add New Event" open={open} action="Save" onAction={handleOnSave} onClose={handleOnCancel}>
      <form onSubmit={handleOnSave}>
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
          <TextInput label="Event" value={event} onChange={(e) => setEvent(e.target.value)} />
          <SelectInput
            label="User"
            value={user}
            items={["", "Husband", "Wife", "Us", "Calendar"]}
            showLabel
            onChange={(e) => setUser(e.target.value)}
          />
          <SelectInput
            label="Tag"
            value={tag}
            items={[
              "",
              "baseball",
              "basketball",
              "chores",
              "football",
              "fun",
              "friends",
              "hockey",
              "holiday",
              "personal",
              "racing",
              "serve",
              "work",
            ]}
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
                onHourChange={(e) => setStartHours(e.target.value)}
                onMinutesChange={(e) => setStartMinutes(e.target.value)}
                onPeriodChange={(e) => setStartPeriod(e.target.value)}
              />
              <TimeInput
                label="End Time"
                hour={endHours}
                minutes={endMinutes}
                period={endPeriod}
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

export default AddNewEventModal;
