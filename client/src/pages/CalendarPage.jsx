//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { useSelectedStartTimeContext } from "../hooks/useSelectedStartTimeContext";

import { getEvents } from "../api/events";

import Button from "../core/button/Button";
import Divider from "../core/divider/Divider";

import SideNav from "../components/sideNav/SideNav";

import CalendarLayout from "../components/layouts/CalendarLayout";
import DetailsLayout from "../components/layouts/DetailsLayout";
import HeaderLayout from "../components/layouts/HeaderLayout";
import LegendLayout from "../components/layouts/LegendLayout";

import { calendars } from "../utility/calendars";
import { filterEvents } from "../utility/utility";

const CalendarPage = () => {
  const { user } = useAuthContext();
  const { events, dispatch } = useEventsContext();
  const { dispatchSelectedStartTime } = useSelectedStartTimeContext();

  const [visibleCalendars, setVisibleCalendars] = useState([]);

  const [legendReset, setLegendReset] = useState(false);

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

        setLegendReset(false);
      } else {
        setVisibleCalendars(
          calendars
            .map((calendar) => calendar.user)
            .filter((visibleCalendar) => visibleCalendar === calendar)
        );

        setLegendReset(true);
      }
    } else {
      setVisibleCalendars(visibleCalendars.filter((visibleCalendar) => visibleCalendar === calendar));

      setLegendReset(true);
    }
  };

  const handleLegendReset = () => {
    setVisibleCalendars(calendars.map((calendar) => calendar.user));

    setLegendReset(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav selected="Calendar" />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md min-h-fit md:min-h-72">
        <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600 h-fit">
          <div className="grid grid-cols-12 m-auto w-full">
            <div className="col-span-12">
              <HeaderLayout
                action={
                  <Link to="/event">
                    <Button
                      variant="default"
                      prefix={<AddIcon />}
                      onClick={() =>
                        dispatchSelectedStartTime({ type: Actions.SET_SELECTED_START_TIME, payload: "" })
                      }
                    >
                      <span className="inline-flex">Add&nbsp;</span>
                      <span className="inline-flex sm:inline-flex md:hidden lg:inline-flex">Event</span>
                    </Button>
                  </Link>
                }
              />
              <Divider />
            </div>
            <div className="col-span-12">
              <DetailsLayout data={filterEvents(visibleCalendars, events)} calendars={calendars} />
              <Divider />
            </div>
            <div className="hidden md:block col-span-12">
              <LegendLayout
                calendars={calendars}
                visibleCalendars={visibleCalendars}
                showReset={legendReset}
                onClick={handleLegendChange}
                onReset={handleLegendReset}
              />
              <Divider />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-9 flex flex-col gap-0 md:gap-8 p-0 md:p-8">
          <CalendarLayout data={filterEvents(visibleCalendars, events)} />
          <div className="block md:hidden col-span-12">
            <LegendLayout
              calendars={calendars}
              visibleCalendars={visibleCalendars}
              showReset={legendReset}
              onClick={handleLegendChange}
              onReset={handleLegendReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
