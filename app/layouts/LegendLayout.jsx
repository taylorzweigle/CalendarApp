//Taylor Zweigle, 2023
"use client";

import React from "react";

import Legend from "../components/legend/Legend";
import Typography from "../components/typography/Typography";

import { calendars } from "../utility/calendars";

const LegendLayout = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="subheading">Calendars</Typography>
        <div className="flex flex-col gap-2">
          {calendars.map((calendar) => (
            <Legend key={calendar.id} color={calendar.color} label={calendar.user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
