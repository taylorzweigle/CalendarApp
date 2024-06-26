//Taylor Zweigle, 2024
import React from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import Typography from "../typography/Typography";

const IconButton = ({ color, loading, onClick, children }) => {
  return (
    <button
      className={`bg-transparent dark:bg-transparent md:hover:bg-slate-950/15 md:dark:hover:bg-slate-50/15 active:bg-slate-950/15 active:dark:bg-slate-50/15 rounded-full w-10 h-10`}
      onClick={onClick}
    >
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="text-slate-700 dark:text-white animate-spin" />}
        {!loading && children ? (
          <Typography variant="body1" color="custom" customColor={color}>
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default IconButton;
