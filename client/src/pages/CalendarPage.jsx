//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import * as Actions from "../actions";
import * as Payloads from "../payloads";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { useSelectedViewContext } from "../hooks/useSelectedViewContext";

import { getEvents } from "../api/events";

import Divider from "../core/divider/Divider";

import SideNav from "../components/sideNav/SideNav";

import CalendarLayout from "../components/layouts/CalendarLayout";
import DetailsLayout from "../components/layouts/DetailsLayout";
import HeaderLayout from "../components/layouts/HeaderLayout";
import LegendLayout from "../components/layouts/LegendLayout";
import TimelineLayout from "../components/layouts/TimelineLayout";

import { calendars } from "../utility/calendars";
import { filterEvents } from "../utility/utility";

const CalendarPage = () => {
  const { user } = useAuthContext();
  const { events, dispatch } = useEventsContext();
  const { selectedView } = useSelectedViewContext();

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
      <SideNav />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md">
        <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600">
          <div className="grid grid-cols-12 m-auto w-full">
            <div className="col-span-12">
              <HeaderLayout editUser={user.username === "calendarapp_edit"} />
              <Divider />
            </div>
            {selectedView === Payloads.CALENDAR_VIEW_CALENDAR && (
              <div className="col-span-12">
                <DetailsLayout
                  data={filterEvents(visibleCalendars, events)}
                  calendars={calendars}
                  editUser={user.username === "calendarapp_edit"}
                />
                <Divider />
              </div>
            )}
            <div className="hidden md:block col-span-12">
              <LegendLayout visibleCalendars={visibleCalendars} onClick={handleLegendChange} />
              <Divider />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-9 flex flex-col gap-0 md:gap-8 p-0 md:p-8">
          {selectedView === Payloads.CALENDAR_VIEW_CALENDAR && <CalendarLayout data={filterEvents(visibleCalendars, events)} />}
          {selectedView === Payloads.CALENDAR_VIEW_TIMELINE && <TimelineLayout data={filterEvents(visibleCalendars, events)} />}
          <div className="block md:hidden col-span-12">
            <Divider />
            <LegendLayout visibleCalendars={visibleCalendars} onClick={handleLegendChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
