//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../../core/typography/Typography";

const CalendarHeaderDay = ({ day }) => {
  return (
    <th className="bg-white dark:bg-slate-800 h-12 cursor-default" key={day}>
      <Typography variant="body1" color="primary">
        <span className="hidden md:block">{day.slice(0, 3)}</span>
        <span className="block md:hidden">{day.slice(0, 1)}</span>
      </Typography>
    </th>
  );
};

export default CalendarHeaderDay;
