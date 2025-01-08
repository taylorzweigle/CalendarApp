//Taylor Zweigle, 2025
import React, { forwardRef } from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import Typography from "../typography/Typography";

const IconButton = forwardRef(({ loading, disabled, onClick, children }, ref) => {
  return (
    <button
      ref={ref}
      className={`bg-transparent dark:bg-transparent ${
        !disabled &&
        "md:hover:bg-slate-950/15 md:dark:hover:bg-slate-50/15 active:bg-slate-950/15 active:dark:bg-slate-50/15"
      } rounded-full min-w-12 min-h-12`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="text-slate-700 dark:text-white animate-spin" />}
        {!loading && children ? (
          <Typography
            variant="body1"
            color={disabled ? "secondary" : "custom"}
            customColor={"text-slate-950 dark:text-white"}
          >
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
});

export default IconButton;
