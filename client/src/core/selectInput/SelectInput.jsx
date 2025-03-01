//Taylor Zweigle, 2025
import React, { forwardRef } from "react";

import { getIcons } from "../../utility/utility";

import Typography from "../typography/Typography";

const SelectInput = forwardRef(({ label, value, showIcon, error, items, showLabel, onChange }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {showLabel && (
        <Typography variant="body1" color="primary">
          {label}
        </Typography>
      )}
      <span className="relative w-full">
        {showIcon && value !== "" && (
          <span className="absolute text-slate-950 dark:text-white px-4 py-2.5">{getIcons(value)}</span>
        )}
        <select
          id={label}
          ref={ref}
          value={value}
          onChange={onChange}
          className={`bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-600 sm:hover:border-sky-500 sm:hover:dark:border-sky-600 text-slate-950 dark:text-white text-md text-left w-full rounded-lg ${
            showIcon ? "px-10" : "px-4"
          } h-12 w-full`}
        >
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </span>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
});

export default SelectInput;
