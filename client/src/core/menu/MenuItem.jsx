//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const MenuItem = forwardRef(({ children, badge, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-row justify-between items-center bg-white dark:bg-slate-950 sm:hover:bg-slate-100 sm:hover:dark:bg-slate-800 active:bg-slate-100 active:dark:bg-slate-800 h-12 w-48 p-4 cursor-pointer"
      onClick={onClick}
    >
      <Typography variant="body1">{children}</Typography>
      {badge && (
        <span className="flex justify-center items-center w-5 h-5 bg-rose-400 dark:bg-rose-500 text-white rounded-full">
          <Typography variant="caption" bold>
            {badge}
          </Typography>
        </span>
      )}
    </div>
  );
});

export default MenuItem;
