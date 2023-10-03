//Taylor Zweigle, 2023
"use client";

import React from "react";

import { daysOfWeek, months } from "../components/calendar/Calendar";
import Typography from "../components/typography/Typography";

const DetailsLayout = ({ selectedDate }) => {
  return (
    <div className="flex flex-col gap-8 border-b border-slate-300 p-8">
      <Typography variant="subheading">
        {`${daysOfWeek[selectedDate.weekday]}, ${months[selectedDate.month]} ${selectedDate.date}, ${selectedDate.year}`}
      </Typography>
    </div>
  );
};

export default DetailsLayout;
