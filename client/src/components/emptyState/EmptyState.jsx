//Taylor Zweigle, 2024
import React from "react";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import Typography from "../typography/Typography";

const EmptyState = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <CalendarTodayIcon className="text-slate-300 dark:text-slate-600 text-8xl" />
      <Typography variant="body1">No Events Today</Typography>
    </div>
  );
};

export default EmptyState;
