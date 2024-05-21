//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from "../hooks/useEventsContext";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import SelectInput from "../core/selectInput/SelectInput";
import Tab from "../core/tabs/Tab";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

import { months } from "../components/calendar/Calendar";
import DateInput from "../components/inputs/DateInput";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import TimeInput from "../components/inputs/TimeInput";

import { getEvent, getEvents, updateEvent, deleteEvent } from "../api/events";

import { tags } from "../utility/calendars";

const EditEventPage = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useEventsContext();

  const [duration, setDuration] = useState("Partial Day");

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

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(params.id, authUser.token);

      setDuration(event.json.startTime === event.json.endTime ? "All Day" : "Partial Day");

      setEvent(event.json.event);
      setUser(event.json.user);
      setTag(event.json.tag);
      setMonth(months[new Date(event.json.startTime).getMonth()]);
      setDate(new Date(event.json.startTime).getDate());
      setYear(new Date(event.json.startTime).getFullYear());
      setStartHours(
        new Date(event.json.startTime).getHours() > 12
          ? (new Date(event.json.startTime).getHours() - 12).toString()
          : new Date(event.json.startTime).getHours()
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
          : new Date(event.json.endTime).getHours()
      );
      setEndMinutes(
        new Date(event.json.endTime).getMinutes() < 10
          ? `0${new Date(event.json.endTime).getMinutes()}`
          : new Date(event.json.endTime).getMinutes()
      );
      setEndPeriod(new Date(event.json.endTime).getHours() >= 12 ? "PM" : "AM");
    };

    if (authUser) {
      fetchEvent();
    }
  }, [params.id, authUser]);

  const handleOnCancel = () => {
    navigate("/");
  };

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
      startTime:
        duration === "All Day"
          ? new Date(`${month} ${date}, ${year}`)
          : new Date(
              `${month} ${date}, ${year} ${
                startPeriod === "PM" ? (startHours !== "12" ? (parseInt(startHours) + 12).toString() : startHours) : startHours
              }:${startMinutes}:00`
            ),
      endTime:
        duration === "All Day"
          ? new Date(`${month} ${date}, ${year}`)
          : new Date(
              `${month} ${date}, ${year} ${
                endPeriod === "PM" ? (endHours !== "12" ? (parseInt(endHours) + 12).toString() : endHours) : endHours
              }:${endMinutes}:00`
            ),
    };

    const json = await updateEvent(params.id, newEvent, authUser.token);

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
      const events = await getEvents(authUser.token);

      if (events.json) {
        dispatch({ type: Actions.GET_EVENTS, payload: events.json });
      }

      navigate("/");

      clearForm();
    }
  };

  const handleOnDelete = async () => {
    const event = await deleteEvent(params.id, authUser.token);

    if (event.json) {
      dispatch({ type: Actions.DELETE_EVENT, payload: event.json });

      navigate("/");
    }
  };

  const clearForm = () => {
    setDuration("Partial Day");
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
      <DeleteConfirmationModal open={deleteModal} onDeleteClick={handleOnDelete} onCancelClick={() => setDeleteModal(false)} />
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
                <Typography variant="heading">Edit Event</Typography>
              </div>
              <div className="flex flex-1">&nbsp;</div>
            </div>
            <div className="flex flex-col">
              <div className={`${duration === "All Day" ? "h-[calc(100vh-288px)] sm:h-fit" : "h-fit"} p-4`}>
                <form onSubmit={handleOnSave}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center">
                      <Tab
                        value="Partial Day"
                        selected={duration === "Partial Day"}
                        onClick={() => setDuration("Partial Day")}
                      />
                      <Tab value="All Day" selected={duration === "All Day"} onClick={(e) => setDuration("All Day")} />
                      <Tab
                        value="Multiple Days"
                        selected={duration === "Multiple Days"}
                        onClick={(e) => setDuration("Multiple Days")}
                      />
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
                    {duration !== "All Day" && (
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
                <div className="sm:order-1">
                  <Button variant="primary" fullWidth onClick={handleOnSave}>
                    Update
                  </Button>
                </div>
                <div>
                  <Button variant="error" fullWidth onClick={() => setDeleteModal(true)}>
                    Delete
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

export default EditEventPage;
