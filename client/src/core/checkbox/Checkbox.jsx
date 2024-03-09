//Taylor Zweigle, 2024
import React from "react";

import CheckIcon from "@mui/icons-material/Check";

import Typography from "../typography/Typography";

const Checkbox = ({ selected, onClick }) => {
  return (
    <label className="block relative pl-8 text-base text-slate-700 dark:text-white cursor-pointer">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        All Day
      </Typography>
      <input type="checkbox" className="absolute opacity-0 h-0 w-0" checked={selected} onChange={onClick} />
      <span
        className={`absolute flex justify-center items-center top-0 left-0 h-7 w-7 border-2 border-slate-400 dark:border-slate-600 rounded-lg ${
          selected ? "bg-blue-500 dark:bg-blue-600" : "bg-white dark:bg-slate-950"
        } `}
      >
        {selected && <CheckIcon className="text-white" fontSize="small" />}
      </span>
    </label>
  );
};

export default Checkbox;
