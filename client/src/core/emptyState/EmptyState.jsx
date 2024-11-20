//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import EventBusyTwoToneIcon from "@mui/icons-material/EventBusyTwoTone";

import Typography from "../typography/Typography";

const EmptyState = forwardRef(({ type }, ref) => {
  return (
    <div ref={ref} className="flex flex-col gap-0 justify-center items-center">
      <EventBusyTwoToneIcon className="text-slate-300 dark:text-slate-600" sx={{ fontSize: "72px" }} />
      <Typography variant="subheading" color="primary">
        {`No ${type}s`}
      </Typography>
      <Typography variant="body2" color="secondary">
        {`Click "Add ${type}" to create a new ${type.toLowerCase()}.`}
      </Typography>
    </div>
  );
});

export default EmptyState;
