//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useAuthContext } from "../hooks/useAuthContext";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import Typography from "../core/typography/Typography";

import { months } from "../components/calendar/Calendar";
import Details from "../components/details/Details";

import { getEvent } from "../api/events";

import { calendars } from "../utility/calendars";

const ViewEventPage = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { user: authUser } = useAuthContext();

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

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(params.id, authUser.token);

      setAllDay(event.json.startTime === event.json.endTime ? true : false);

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
              <Typography variant="heading">View Event</Typography>
            </div>
            <div className="flex flex-1">&nbsp;</div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-8 p-4">
              <Details label="Date" value={`${month} ${date}, ${year}`} />
              <Details label="Event" value={event} />
              <Details label="User" value={user} color={user && calendars.find((c) => c.user === user).color} />
              <Details label="Tag" value={tag} icon={tag} />
              <Details
                label="Time"
                value={
                  allDay ? "All Day" : `${startHours}:${startMinutes} ${startPeriod} - ${endHours}:${endMinutes} ${endPeriod}`
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 border-t p-4 border-slate-300 dark:border-slate-600">
              <div>
                <Button variant="default" fullWidth onClick={handleOnCancel}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewEventPage;
