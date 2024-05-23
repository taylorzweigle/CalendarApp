//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../../core/typography/Typography";

const CalendarHeaderDay = ({ day }) => {
  return (
    <th className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 h-12 cursor-default" key={day}>
      <Typography variant="body1" color="secondary">
        {day.slice(0, 3)}
      </Typography>
    </th>
  );
};

export default CalendarHeaderDay;
