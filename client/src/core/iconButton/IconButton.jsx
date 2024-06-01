//Taylor Zweigle, 2024
import React from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import Typography from "../typography/Typography";

const IconButton = ({ loading, onClick, children }) => {
  return (
    <button
      className={`bg-transparent dark:bg-transparent md:hover:bg-slate-200 md:dark:hover:bg-slate-700 active:bg-slate-200 active:dark:bg-slate-700 rounded-full w-12 h-12`}
      onClick={onClick}
    >
      <div className="flex flex-row gap-1 justify-center items-center">
        {loading && <DataUsageIcon className="text-slate-700 dark:text-white animate-spin" />}
        {!loading && children ? (
          <Typography variant="body1" color="primary">
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default IconButton;
