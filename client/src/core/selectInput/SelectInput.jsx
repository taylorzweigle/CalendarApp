//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const SelectInput = forwardRef(({ label, value, error, items, showLabel, onChange }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {showLabel && (
        <Typography variant="body1" color="primary">
          {label}
        </Typography>
      )}
      <select
        id={label}
        ref={ref}
        value={value}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border-2 border-slate-400 dark:border-slate-600 sm:hover:border-sky-500 sm:hover:dark:border-sky-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
});

export default SelectInput;
