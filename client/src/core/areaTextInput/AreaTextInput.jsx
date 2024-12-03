//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const AreaTextInput = forwardRef(({ label, value, rows, maxLength, error, showLabel, onChange }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {showLabel && (
        <Typography variant="body1" color="primary">
          {label}
        </Typography>
      )}
      <textarea
        id={label}
        ref={ref}
        value={value}
        rows={rows}
        maxLength={maxLength}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-600 sm:hover:border-sky-500 sm:hover:dark:border-sky-600 text-slate-950 dark:text-white text-md w-full rounded-lg p-4 resize-none"
      />
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
});

export default AreaTextInput;
