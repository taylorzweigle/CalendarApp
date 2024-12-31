//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import * as Actions from "../actions";

import { useCalendarsContext } from "../hooks/useCalendarsContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { useSelectedDateContext } from "../hooks/useSelectedDateContext";

import Button from "../core/button/Button";
import Divider from "../core/divider/Divider";

import SideNav from "../components/sideNav/SideNav";

import HeaderLayout from "../components/layouts/HeaderLayout";
import LegendLayout from "../components/layouts/LegendLayout";
import TimelineLayout from "../components/layouts/TimelineLayout";

import { filterEvents } from "../utility/utility";

const DayViewPage = () => {
  const { calendars } = useCalendarsContext();
  const { events } = useEventsContext();
  const { selectedDate, dispatchSelectedDate } = useSelectedDateContext();

  const [visibleCalendars, setVisibleCalendars] = useState([]);

  const [legendReset, setLegendReset] = useState(false);

  useEffect(() => {
    if (calendars.length > 0) {
      setVisibleCalendars(calendars.map((calendar) => calendar.calendar));
    }
  }, [calendars]);

  const handleLegendChange = (calendar) => {
    if (visibleCalendars.length === 1) {
      if (visibleCalendars.includes(calendar)) {
        setVisibleCalendars(calendars.map((calendar) => calendar.calendar));

        setLegendReset(false);
      } else {
        setVisibleCalendars(
          calendars
            .map((calendar) => calendar.calendar)
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
    setVisibleCalendars(calendars.map((calendar) => calendar.calendar));

    setLegendReset(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav selected="Day" />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md min-h-screen md:min-h-72">
        <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600">
          <div className="grid grid-cols-12 m-auto w-full">
            <div className="col-span-12">
              <HeaderLayout
                action={
                  <Link to="/event">
                    <Button
                      variant="default"
                      prefix={<AddIcon />}
                      onClick={() =>
                        dispatchSelectedDate({
                          type: Actions.SET_SELECTED_DATE,
                          payload: {
                            month: selectedDate.month,
                            date: selectedDate.date,
                            year: selectedDate.year,
                            hour: "",
                            minute: "",
                            period: "",
                          },
                        })
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
          <TimelineLayout data={filterEvents(visibleCalendars, events)} />
          <div className="block md:hidden col-span-12">
            <Divider />
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

export default DayViewPage;
