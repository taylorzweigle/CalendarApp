//Taylor Zweigle, 2024
import React from "react";

import EventBusyTwoToneIcon from "@mui/icons-material/EventBusyTwoTone";

import Typography from "../typography/Typography";

const EmptyState = ({ readOnly }) => {
  return (
    <div className="flex flex-col gap-0 justify-center items-center">
      <EventBusyTwoToneIcon className="text-slate-300 dark:text-slate-600" sx={{ fontSize: "72px" }} />
      <Typography variant="subheading">No Events Today</Typography>
      {!readOnly && (
        <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
          Click "Add Event" to create a new event.
        </Typography>
      )}
    </div>
  );
};

export default EmptyState;
