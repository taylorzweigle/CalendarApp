//Taylor Zweigle, 2023
"use client";

import React, { useState, useEffect } from "react";

import Modal from "../components/modal/Modal";
import SelectInput from "../components/selectInput/SelectInput";
import TextInput from "../components/textInput/TextInput";
import TimeInput from "../components/timeInput/TimeInput";
import Typography from "../components/typography/Typography";

import { months } from "../components/calendar/Calendar";

import { createEvent } from "../api/events";

const AddNewEventModal = ({ open, selectedDate, onSaveClick, onCancelClick }) => {
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

  const defaultDate = `${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`;

  useEffect(() => {
    setDate(defaultDate);
  });

  const handleOnSave = (e) => {
    e.preventDefault();

    const newEvent = {
      event: event,
      user: user,
      tag: tag,
      startTime: allDay
        ? new Date(date)
        : new Date(`${date} ${startPeriod === "PM" ? (parseInt(startHours) + 12).toString() : startHours}:${startMinutes}:00`),
      endTime: allDay
        ? new Date(date)
        : new Date(`${date} ${endPeriod === "PM" ? (parseInt(endHours) + 12).toString() : endHours}:${endMinutes}:00`),
    };

    createEvent(newEvent);

    clearForm();
    onSaveClick();
  };

  const handleOnCancel = () => {
    clearForm();
    onCancelClick();
  };

  const clearForm = () => {
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
            <div className="flex flex-row items-center gap-2">
              <input type="checkbox" onClick={() => setAllDay(!allDay)} />
              <Typography variant="body1">All Day</Typography>
            </div>
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
            items={["", "baseball", "chores", "football", "fun", "friends", "holiday", "personal", "racing", "serve", "work"]}
            showLabel
            onChange={(e) => setTag(e.target.value)}
          />
          {!allDay && (
            <>
              <TimeInput
                label="Start Time"
                hours={startHours}
                minutes={startMinutes}
                period={startPeriod}
                onHourChange={(e) => setStartHours(e.target.value)}
                onMinutesChange={(e) => setStartMinutes(e.target.value)}
                onPeriodChange={(e) => setStartPeriod(e.target.value)}
              />
              <TimeInput
                label="End Time"
                hours={endHours}
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
