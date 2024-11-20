//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const TextInput = forwardRef(
  ({ label, value, type, pattern, inputMode, maxLength, error, showLabel, onChange }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {showLabel && (
          <Typography variant="body1" color="primary">
            {label}
          </Typography>
        )}
        <input
          id={label}
          value={value}
          type={type}
          pattern={pattern}
          inputMode={inputMode}
          maxLength={maxLength}
          onChange={onChange}
          className="bg-white dark:bg-slate-950 border-2 border-slate-400 dark:border-slate-600 sm:hover:border-sky-500 sm:hover:dark:border-sky-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

export default TextInput;
