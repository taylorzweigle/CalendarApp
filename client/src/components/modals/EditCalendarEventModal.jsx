//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "../../actions";

import { useEventsContext } from "../../hooks/useEventsContext";

import Modal from "../../core/modal/Modal";
import SelectInput from "../../core/selectInput/SelectInput";
import TextInput from "../../core/textInput/TextInput";
import TimeInput from "../../core/timeInput/TimeInput";

import { months } from "../calendar/Calendar";

import { getEvents, deleteEvent, updateEvent } from "../../api/events";

import { tags } from "../../utility/calendars";

const EditCalendarEventModal = ({ open, eventDetails, onSaveClick, onDeleteClick, onCancelClick }) => {
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

    const json = await updateEvent(eventDetails, newEvent);

    if (json) {
      const events = await getEvents();

      if (events) {
        dispatch({ type: Actions.GET_EVENTS, payload: events });
      }

      clearForm();

      onSaveClick();
    }
  };

  const handleOnDelete = async () => {
    const json = await deleteEvent(eventDetails);

    if (json) {
      dispatch({ type: Actions.DELETE_EVENT, payload: json });

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
  };

  return (
    <Modal
      title="Edit Calendar Event"
      open={open}
      action="Save"
      secondaryAction="Delete"
      onAction={handleOnSave}
      onSecondaryAction={handleOnDelete}
      onClose={handleOnCancel}
    >
      <form onSubmit={handleOnSave}>
        <div className="flex flex-col gap-4">
          <TextInput label="Event" value={event} onChange={(e) => setEvent(e.target.value)} />
          <SelectInput
            label="User"
            value={user}
            items={["", "Husband", "Wife", "Us", "Calendar"]}
            showLabel
            onChange={(e) => setUser(e.target.value)}
          />
          <SelectInput label="Tag" value={tag} items={tags} showLabel onChange={(e) => setTag(e.target.value)} />
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

export default EditCalendarEventModal;
