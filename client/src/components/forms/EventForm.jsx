//Taylor Zweigle, 2025
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useCalendarsContext } from "../../hooks/useCalendarsContext";
import { useEventsContext } from "../../hooks/useEventsContext";
import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from "../../api/events";
import { tags } from "../../api/tags";

import Button from "../../core/button/Button";
import Checkbox from "../../core/checkbox/Checkbox";
import SelectInput from "../../core/selectInput/SelectInput";
import Tab from "../../core/tabs/Tab";
import TextInput from "../../core/textInput/TextInput";
import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";
import DateInput from "../inputs/DateInput";
import DatePickerModal from "../modals/DatePickerModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import TimeInput from "../inputs/TimeInput";

const EventForm = ({ isEditEventForm }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { user: authUser } = useAuthContext();
  const { calendars } = useCalendarsContext();
  const { dispatchEvents } = useEventsContext();
  const { selectedDate } = useSelectedDateContext();

  const [allDay, setAllDay] = useState(false);
  const [recurring, setRecurring] = useState(false);

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
  const [creationTime, setCreationTime] = useState("");

  const [eventError, setEventError] = useState("");
  const [userError, setUserError] = useState("");
  const [tagError, setTagError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  const [startMonthPickerModal, setStartMonthPickerModal] = useState(false);
  const [endMonthPickerModal, setEndMonthPickerModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      const event = await getEvent(params.id, authUser.token);

      setDuration(
        new Date(event.json.startTime).getMonth() === new Date(event.json.endTime).getMonth() &&
          new Date(event.json.startTime).getDate() === new Date(event.json.endTime).getDate() &&
          new Date(event.json.startTime).getFullYear() === new Date(event.json.endTime).getFullYear()
          ? Actions.SINGLE_DAY
          : Actions.MULTIPLE_DAYS
      );

      setEvent(event.json.event);
      setUser(event.json.user);
      setTag(event.json.tag);
      setStartMonth(new Date(event.json.startTime).getMonth());
      setStartDate(new Date(event.json.startTime).getDate());
      setStartYear(event.json.recurring ? selectedDate.year : new Date(event.json.startTime).getFullYear());
      setEndMonth(new Date(event.json.endTime).getMonth());
      setEndDate(new Date(event.json.endTime).getDate());
      setEndYear(new Date(event.json.endTime).getFullYear());
      setStartHours(
        new Date(event.json.startTime).getHours() > 12
          ? (new Date(event.json.startTime).getHours() - 12).toString()
          : new Date(event.json.startTime).getHours().toString()
      );
      setStartMinutes(
        new Date(event.json.startTime).getMinutes() < 10
          ? `0${new Date(event.json.startTime).getMinutes()}`
          : new Date(event.json.startTime).getMinutes()
      );
      setStartPeriod(new Date(event.json.startTime).getHours() >= 12 ? "PM" : "AM");
      setEndHours(
        new Date(event.json.endTime).getHours() > 12
          ? (new Date(event.json.endTime).getHours() - 12).toString()
          : new Date(event.json.endTime).getHours().toString()
      );
      setEndMinutes(
        new Date(event.json.endTime).getMinutes() < 10
          ? `0${new Date(event.json.endTime).getMinutes()}`
          : new Date(event.json.endTime).getMinutes()
      );
      setEndPeriod(new Date(event.json.endTime).getHours() >= 12 ? "PM" : "AM");
      setAllDay(event.json.allDay);
      setRecurring(event.json.recurring !== undefined ? event.json.recurring : false);
      setCreationTime(new Date());
    };

    if (authUser) {
      if (isEditEventForm) {
        fetchEventData();
      }
    }
  }, [params.id, authUser, isEditEventForm, selectedDate]);

  useEffect(() => {
    if (!isEditEventForm) {
      if (selectedDate) {
        setStartMonth(selectedDate.month);
        setStartDate(selectedDate.date);
        setStartYear(selectedDate.year);
        setEndMonth(selectedDate.month);
        if (duration === Actions.MULTIPLE_DAYS) {
          setEndMonth(
            new Date(
              new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).setDate(
                new Date(
                  `${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`
                ).getDate() + 1
              )
            ).getMonth()
          );
          setEndDate(
            new Date(
              new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).setDate(
                new Date(
                  `${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`
                ).getDate() + 1
              )
            ).getDate()
          );
          setEndYear(
            new Date(
              new Date(`${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`).setDate(
                new Date(
                  `${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`
                ).getDate() + 1
              )
            ).getFullYear()
          );
        }

        if (selectedDate.hour > 0) {
          setStartHours(selectedDate.hour % 12 === 0 ? "12" : (selectedDate.hour % 12).toString());
          setStartMinutes("00");
          setStartPeriod(selectedDate.hour >= 12 ? "PM" : "AM");
          setEndHours(
            ((parseInt(selectedDate.hour) + 1) % 12 === 0
              ? "12"
              : (parseInt(selectedDate.hour) + 1) % 12
            ).toString()
          );
          setEndMinutes("00");
          setEndPeriod(parseInt(selectedDate.hour) + 1 >= 12 ? "PM" : "AM");
        } else if (selectedDate.hour === 0) {
          setStartHours(0);
          setStartMinutes("00");
          setStartPeriod("AM");
          setEndHours(0);
          setEndMinutes("00");
          setEndPeriod("AM");
          setDuration(Actions.SINGLE_DAY);
          setAllDay(true);
        }
      }
    }
  }, [selectedDate, duration, isEditEventForm]);

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

  const handleRecurringClick = () => {
    setRecurring(!recurring);
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
      recurring: recurring,
      creationTime: isEditEventForm ? creationTime : new Date(),
    };

    const json = isEditEventForm
      ? await updateEvent(params.id, newEvent, authUser.token)
      : await createEvent(newEvent, authUser.token);

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
      dispatchEvents({ type: Actions.CREATE_EVENT, payload: json.json });

      const events = await getEvents(authUser.token);

      if (events.json) {
        dispatchEvents({ type: Actions.GET_EVENTS, payload: events.json });
      }

      navigate(-1);

      clearForm();

      setLoading(false);
    }
  };

  const handleOnDelete = async () => {
    setDeleteLoading(true);

    if (deleteLoading) {
      return;
    }

    const event = await deleteEvent(params.id, authUser.token);

    if (event.json) {
      dispatchEvents({ type: Actions.DELETE_EVENT, payload: event.json });

      navigate(-1);

      setDeleteLoading(false);
    }
  };

  const handleStartPeriodChange = (value) => {
    setStartPeriod(value);

    if (duration === Actions.SINGLE_DAY) {
      if (value === "AM") {
        setEndPeriod("AM");
      } else if (value === "PM") {
        setEndPeriod("PM");
      }
    }
  };

  const handleEndPeriodChange = (value) => {
    setEndPeriod(value);

    if (duration === Actions.SINGLE_DAY) {
      if (value === "AM") {
        setStartPeriod("AM");
      }
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
      <DeleteConfirmationModal
        open={deleteModal}
        type="event"
        loading={deleteLoading}
        onDeleteClick={handleOnDelete}
        onCancelClick={() => setDeleteModal(false)}
      />
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
                disabled={isEditEventForm && recurring}
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
                items={["", ...calendars.map((calendar) => calendar.calendar)]}
                showLabel
                onChange={(e) => setUser(e.target.value)}
              />
              <SelectInput
                label="Tag"
                value={tag}
                showIcon
                error={tagError}
                items={["", ...tags]}
                showLabel
                onChange={(e) => setTag(e.target.value)}
              />
              <div className="flex items-center h-12">
                <Checkbox label="All Day" selected={allDay} onClick={handleAllDayClick} />
              </div>
              {allDay && duration === Actions.SINGLE_DAY && (
                <div className="flex items-center h-12">
                  <Checkbox
                    label="Recurring"
                    selected={recurring}
                    disabled={isEditEventForm}
                    onClick={handleRecurringClick}
                  />
                </div>
              )}
              {!allDay && (
                <>
                  <TimeInput
                    label="Start Time"
                    hour={startHours}
                    minutes={startMinutes}
                    period={startPeriod}
                    error={startTimeError}
                    onHourChange={(value) => setStartHours(value)}
                    onMinutesChange={(value) => setStartMinutes(value)}
                    onPeriodChange={(value) => handleStartPeriodChange(value)}
                  />
                  <TimeInput
                    label="End Time"
                    hour={endHours}
                    minutes={endMinutes}
                    period={endPeriod}
                    error={endTimeError}
                    onHourChange={(value) => setEndHours(value)}
                    onMinutesChange={(value) => setEndMinutes(value)}
                    onPeriodChange={(value) => handleEndPeriodChange(value)}
                  />
                </>
              )}
              {recurring && (
                <Typography variant="body2" color="primary">
                  {isEditEventForm
                    ? `Event repeats every year on ${months[startMonth]} ${startDate}.`
                    : `Event will repeat every year on ${months[startMonth]} ${startDate}.`}
                </Typography>
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
          {isEditEventForm && (
            <div>
              <Button variant="error" fullWidth onClick={() => setDeleteModal(true)}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventForm;
