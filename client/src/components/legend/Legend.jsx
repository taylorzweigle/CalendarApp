//Taylor Zweigle, 2025
import React, { forwardRef } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import Typography from "../../core/typography/Typography";

import { getColors } from "../../utility/utility";
import IconButton from "../../core/iconButton/IconButton";

const Legend = forwardRef(({ color, label, selected, deleteable, onClick, onDelete }, ref) => {
  const colors = getColors(color);

  return (
    <div
      ref={ref}
      className="flex flex-row justify-between items-center w-full h-8 cursor-pointer"
      onClick={onClick}
    >
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
      {selected && onClick && (
        <span className="text-slate-700 dark:text-white">
          <CheckIcon />
        </span>
      )}
      {deleteable && (
        <IconButton onClick={onDelete}>
          <CloseIcon />
        </IconButton>
      )}
    </div>
  );
});

export default Legend;
