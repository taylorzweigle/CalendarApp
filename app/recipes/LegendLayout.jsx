//Taylor Zweigle, 2023
"use client";

import React from "react";

import Legend from "../components/legend/Legend";
import Typography from "../components/typography/Typography";

import { calendars } from "../utility/calendars";

const LegendLayout = ({ onClick }) => {
  return (
    <div className="flex flex-col gap-8 border-b border-slate-300 dark:border-slate-600 p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="subheading">Calendars</Typography>
        <div className={`flex sm:flex-row md:flex-col sm:w-full sm:justify-between sm:gap-8 md:gap-2`}>
          {calendars.map((calendar) => (
            <Legend key={calendar.id} color={calendar.color} label={calendar.user} onClick={onClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
