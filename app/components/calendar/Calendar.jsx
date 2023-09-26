"use client";

import React from "react";

import CalendarDay from "./internal/CalendarDay";
import CalendarHeaderDay from "./internal/CalendarHeaderDay";

import { daysOfWeek } from "../../data";

const Calendar = ({ today, selectedDate }) => {
  return (
    <table className="w-full table-fixed border border-collapse border-black">
      <thead>
        <tr>
          {daysOfWeek.map((day) => (
            <CalendarHeaderDay key={day} day={day} />
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <CalendarDay key={day} day={day} />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Calendar;
