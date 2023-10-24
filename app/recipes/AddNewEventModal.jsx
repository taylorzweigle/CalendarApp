//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import Modal from "../components/modal/Modal";
import SelectInput from "../components/selectInput/SelectInput";
import TextInput from "../components/textInput/TextInput";
import TimeInput from "../components/timeInput/TimeInput";

const AddNewEventModal = ({ open, onSaveClick, onCancelClick }) => {
  const [event, setEvent] = useState("");
  const [user, setUser] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleOnSave = () => {
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
    setStartTime("");
    setEndTime("");
  };

  return (
    <Modal title="Add New Event" open={open} action="Save" onAction={handleOnSave} onClose={handleOnCancel}>
      <div className="flex flex-col gap-4">
        <TextInput label="Event" value={event} onChange={(e) => setEvent(e.target.value)} />
        <SelectInput
          label="User"
          value={user}
          items={["Me", "Wife", "Us", "Holiday"]}
          onChange={(e) => setUser(e.target.value)}
        />
        <SelectInput
          label="Tag"
          value={tag}
          items={["baseball", "chores", "football", "fun", "friends", "holiday", "personal", "racing", "serve", "work"]}
          onChange={(e) => setTag(e.target.value)}
        />
        <TextInput label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <TimeInput label="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <TimeInput label="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
    </Modal>
  );
};

export default AddNewEventModal;
