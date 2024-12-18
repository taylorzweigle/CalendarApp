//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import Typography from "../typography/Typography";

const IconButton = forwardRef(({ color, loading, onClick, children }, ref) => {
  let colorClass = "";

  switch (color) {
    case "default":
      colorClass = "text-slate-950 dark:text-white";
      break;
    case "disabled":
      colorClass = "text-slate-500 dark:text-slate-500";
      break;
    default:
      colorClass = "text-slate-950 dark:text-white";
  }

  return (
    <button
      ref={ref}
      className={`bg-transparent dark:bg-transparent ${
        color === "default" &&
        "md:hover:bg-slate-950/15 md:dark:hover:bg-slate-50/15 active:bg-slate-950/15 active:dark:bg-slate-50/15"
      } rounded-full min-w-12 min-h-12`}
      onClick={onClick}
    >
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="text-slate-700 dark:text-white animate-spin" />}
        {!loading && children ? (
          <Typography variant="body1" color="custom" customColor={colorClass}>
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
});

export default IconButton;
