//Taylor Zweigle, 2023
"use client";

import React from "react";

import TotalsBar from "../components/totalsBar/TotalsBar";
import Typography from "../components/typography/Typography";

import { calendars } from "../utility/calendars";

const StatsLayout = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="subheading">Totals</Typography>
        <div className="flex flex-col gap-4">
          {calendars.map((calendar) => (
            <TotalsBar key={calendar.id} color={calendar.color} label={calendar.user} count={10} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsLayout;
