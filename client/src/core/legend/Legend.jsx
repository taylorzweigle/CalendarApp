//Taylor Zweigle, 2024
import React from "react";

import CheckIcon from "@mui/icons-material/Check";

import Typography from "../typography/Typography";

import { getColors } from "../../utility/utility";

const Legend = ({ color, label, selected, onClick }) => {
  const colors = getColors(color);

  return (
    <div className="flex flex-row justify-between items-center w-full h-8 cursor-pointer" onClick={onClick}>
      <div className="flex flex-row items-center gap-2">
        <div
          className={`${selected ? colors.bg : "bg-white dark:bg-slate-800"} border ${
            selected ? colors.border : "border-slate-300 dark:border-slate-600"
          } rounded-lg w-5 h-5`}
        >
          &nbsp;
        </div>
        <Typography variant="body1" color={selected ? "primary" : "secondary"}>
          {label}
        </Typography>
      </div>
      {selected && (
        <span className="text-slate-700 dark:text-white">
          <CheckIcon />
        </span>
      )}
    </div>
  );
};

export default Legend;
