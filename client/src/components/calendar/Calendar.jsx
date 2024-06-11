//Taylor Zweigle, 2024
import React from "react";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import CalendarDay from "./internal/CalendarDay";
import CalendarHeaderDay from "./internal/CalendarHeaderDay";

import CalendarCard from "../cards/CalendarCard";

import { sortEvents } from "../../utility/utility";

export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = ({ data, calendars, today, onSelectDay }) => {
  const { selectedDate } = useSelectedDateContext();

  const getMonthLength = (year, month) => 32 - new Date(year, month, 32).getDate();

  const getDayOfWeekOfMonthStart = (year, month) => new Date(year, month).getDay();

  const populateCalendar = (year, month) => {
    let calendarDays = [];
    let calendarDaysByWeek = [];

    let remainingDays = 0;

    const monthLength = getMonthLength(year, month);

    const prevMonthLength = getMonthLength(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1);

    const dayOfWeekOfMonthStart = getDayOfWeekOfMonthStart(year, month);

    for (let i = dayOfWeekOfMonthStart - 1; i >= 0; i--) {
      calendarDays.push({
        key: `${month - 1 < 10 ? "0" : ""}${month === 0 ? 11 : month - 1}${
          prevMonthLength - i < 10 ? "0" : ""
        }${prevMonthLength - i}`,
        day: prevMonthLength - i,
      });
    }

    for (let i = 1; i <= monthLength; i++) {
      calendarDays.push({ key: `${month < 10 ? "0" : ""}${month}${i < 10 ? "0" : ""}${i}`, day: i });
    }

    remainingDays = 7 - (calendarDays.length % 7);

    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        calendarDays.push({
          key: `${month + 1 < 10 ? "0" : ""}${month + 1}${i + 1 < 10 ? "0" : ""}${i + 1}`,
          day: i + 1,
        });
      }
    }

    for (let i = 0; i < calendarDays.length; i += 7) {
      let temp = calendarDays.slice(i, i + 7);

      calendarDaysByWeek.push({ week: i / 7, days: temp });
    }

    return calendarDaysByWeek;
  };

  const showBadge = (time) => new Date().getTime() - new Date(time).getTime() < 43200000;

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          {daysOfWeek.map((day) => (
            <CalendarHeaderDay key={day} day={day} />
          ))}
        </tr>
      </thead>
      <tbody>
        {populateCalendar(selectedDate.year, selectedDate.month).map((week) => (
          <tr key={week.week}>
            {week.days.map((day) => (
              <React.Fragment key={day.key}>
                <CalendarDay
                  day={day.day}
                  today={
                    parseInt(day.key.slice(0, 2)) === today.getMonth() &&
                    day.day === today.getDate() &&
                    selectedDate.year === today.getFullYear()
                  }
                  outOfMonth={parseInt(day.key.slice(0, 2)) !== selectedDate.month}
                  selected={
                    parseInt(day.key.slice(0, 2)) === selectedDate.month && selectedDate.date === day.day
                  }
                  onClick={
                    parseInt(day.key.slice(0, 2)) === selectedDate.month
                      ? () => onSelectDay(selectedDate.year, selectedDate.month, day.day)
                      : null
                  }
                >
                  <div className="flex flex-col gap-1 sm:gap-1 md:gap-2 h-full">
                    {data &&
                      sortEvents(
                        data.filter(
                          (item) =>
                            parseInt(day.key.slice(0, 2)) === new Date(item.startTime).getMonth() &&
                            selectedDate.year === new Date(item.startTime).getFullYear() &&
                            day.day === new Date(item.startTime).getDate()
                        )
                      ).map((event) => (
                        <CalendarCard
                          key={event._id}
                          event={event.event}
                          color={calendars.find((calendar) => calendar.user === event.user).color}
                          tag={event.tag}
                          badge={showBadge(event.creationTime)}
                        />
                      ))}
                  </div>
                </CalendarDay>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
