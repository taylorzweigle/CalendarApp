//Taylor Zweigle, 2025
import React, { forwardRef } from "react";

import CheckIcon from "@mui/icons-material/Check";

import Typography from "../typography/Typography";

const Checkbox = forwardRef(({ label, selected, disabled, onClick }, ref) => {
  return (
    <label
      className={`block relative pl-10 text-base text-slate-700 dark:text-white ${
        !disabled && "cursor-pointer"
      }`}
    >
      <Typography variant="body1" color={disabled ? "secondary" : "primary"}>
        {label}
      </Typography>
      <input
        ref={ref}
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={selected}
        disabled={disabled}
        onChange={onClick}
      />
      <span
        className={`absolute flex justify-center items-center top-0 left-0 h-7 w-7 border-2 border-slate-300 dark:border-slate-600 ${
          !disabled && "sm:hover:border-sky-800 sm:hover:dark:border-sky-600"
        } rounded-lg ${
          selected
            ? disabled
              ? "bg-slate-200 dark:bg-slate-600"
              : "bg-blue-500 dark:bg-blue-600"
            : disabled
            ? "bg-white dark:bg-slate-800"
            : "bg-white dark:bg-slate-950"
        } `}
      >
        {selected && <CheckIcon className={disabled ? "text-slate-400" : "text-white"} fontSize="small" />}
      </span>
    </label>
  );
});

export default Checkbox;
