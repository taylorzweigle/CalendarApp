//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from "../hooks/useEventsContext";

import { getEvents } from "../api/events";

import Divider from "../core/divider/Divider";

import SideNav from "../components/sideNav/SideNav";

import HeaderLayout from "../components/layouts/HeaderLayout";
import LegendLayout from "../components/layouts/LegendLayout";
import TimelineLayout from "../components/layouts/TimelineLayout";

import { calendars } from "../utility/calendars";
import { filterEvents } from "../utility/utility";

const TimelinePage = () => {
  const { user } = useAuthContext();
  const { events, dispatch } = useEventsContext();

  const [visibleCalendars, setVisibleCalendars] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents(user.token);

      dispatch({ type: Actions.GET_EVENTS, payload: events.json });
    };

    if (user) {
      fetchEvents();
    }
  }, [dispatch, user]);

  useEffect(() => {
    setVisibleCalendars(calendars.map((calendar) => calendar.user));
  }, []);

  const handleLegendChange = (calendar) => {
    if (visibleCalendars.length === 1) {
      if (visibleCalendars.includes(calendar)) {
        setVisibleCalendars(calendars.map((calendar) => calendar.user));
      } else {
        setVisibleCalendars(
          calendars.map((calendar) => calendar.user).filter((visibleCalendar) => visibleCalendar === calendar)
        );
      }
    } else {
      setVisibleCalendars(visibleCalendars.filter((visibleCalendar) => visibleCalendar === calendar));
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav selected="Timeline" />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md min-h-screen md:min-h-72">
        <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600">
          <div className="grid grid-cols-12 m-auto w-full">
            <div className="col-span-12">
              <HeaderLayout editUser={user.username === "calendarapp_edit"} />
              <Divider />
            </div>
            <div className="hidden md:block col-span-12">
              <LegendLayout visibleCalendars={visibleCalendars} onClick={handleLegendChange} />
              <Divider />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-9 flex flex-col gap-0 md:gap-8 p-0 md:p-8">
          <TimelineLayout data={filterEvents(visibleCalendars, events)} />
          <div className="block md:hidden col-span-12">
            <Divider />
            <LegendLayout visibleCalendars={visibleCalendars} onClick={handleLegendChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
