//Taylor Zweigle, 2023
"use-client";

import React from "react";

import Legend from "../components/legend/Legend";
import Typography from "../components/typography/Typography";

const LegendLayout = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="subheading">Calendars</Typography>
        <div className="flex flex-col gap-2">
          <Legend color="emerald" label="Me" />
          <Legend color="indigo" label="Wife" />
          <Legend color="blue" label="Us" />
          <Legend color="slate" label="Calendar" />
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
