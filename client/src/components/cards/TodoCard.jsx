//Taylor Zweigle, 2025
import React, { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RepeatIcon from "@mui/icons-material/Repeat";

import { getColors } from "../../utility/utility";

import Badge from "../../core/badge/Badge";
import IconButton from "../../core/iconButton/IconButton";
import Typography from "../../core/typography/Typography";

import { daysOfWeek, months } from "../calendar/Calendar";

const TodoCard = ({
  todo,
  color,
  dueDate,
  notes,
  recurring,
  checked,
  badge,
  loading,
  onClick,
  onCheck,
}) => {
  const colors = getColors(color);

  const date = new Date(dueDate);

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`cursor-pointer h-fit border ${
          checked
            ? "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
            : `${colors.bg} ${colors.border}`
        } rounded-md overflow-clip pl-2 pr-2`}
      >
        {badge && <Badge size="large" />}
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center w-full h-14">
            {onCheck && (
              <IconButton loading={loading} onClick={onCheck}>
                {checked ? <CheckIcon /> : <CheckBoxOutlineBlankIcon />}
              </IconButton>
            )}
            <div className="flex flex-col gap-0 p-1 sm:p-2 w-full" onClick={onClick}>
              <Typography
                variant="body2"
                color={checked ? "secondary" : "custom"}
                customColor={colors.text}
                bold
                truncate
                additionalClasses="inline-flex flex-row items-center gap-1"
              >
                {todo}
                {recurring && <RepeatIcon fontSize="small" />}
              </Typography>
              <Typography
                variant="caption"
                color={checked ? "secondary" : "custom"}
                customColor={colors.text}
                truncate
              >
                {`${daysOfWeek[date.getDay()].slice(0, 3)}, ${months[date.getMonth()]} ${date.getDate()}`}
              </Typography>
            </div>
            {notes && (
              <IconButton onClick={() => setExpanded(!expanded)}>
                {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </IconButton>
            )}
          </div>
          {expanded && (
            <div className="pb-2" onClick={onClick}>
              <Typography
                variant="caption"
                color={checked ? "secondary" : "custom"}
                customColor={colors.text}
              >
                {notes}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
