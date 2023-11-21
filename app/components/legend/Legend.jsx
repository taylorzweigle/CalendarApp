//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";

import Typography from "../typography/Typography";

import { getColors } from "../../utility/utility";

const Legend = ({ color, label, onClick }) => {
  const [selected, setSelected] = useState(true);

  const colors = getColors(color);

  const handleLegendClick = () => {
    onClick({ label: label, selected: !selected });

    setSelected(!selected);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-8 cursor-pointer" onClick={handleLegendClick}>
      <div className="flex flex-row items-center gap-2">
        <div
          className={`${selected ? colors.bg : "bg-white dark:bg-slate-800"} border ${
            selected ? colors.border : "border-slate-300 dark:border-slate-600"
          } rounded-lg w-5 h-5`}
        >
          &nbsp;
        </div>
        <Typography variant="body1" color={!selected && "text-slate-500 dark:text-slate-400"}>
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
