//Taylor Zweigle, 2024
import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import Badge from "../../core/badge/Badge";
import IconButton from "../../core/iconButton/IconButton";
import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";

import { getColors } from "../../utility/utility";

const TodoCard = ({ todo, color, dueDate, checked, badge, loading, onClick, onEdit, onDelete }) => {
  const colors = getColors(color);

  const today = new Date();
  const date = new Date(dueDate);

  return (
    <div className="relative">
      <div
        className={`flex flex-row justify-start items-center cursor-pointer h-14 border ${
          checked
            ? "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
            : today >= date
            ? `${colors.bg} border-3 border-rose-600 dark:border-rose-500`
            : `${colors.bg} ${colors.border}`
        } rounded-md overflow-clip pl-4 pr-2`}
      >
        {badge && <Badge size="large" />}
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2" onClick={onClick}>
            {checked ? (
              <span className="text-slate-400 dark:text-slate-500">
                <CheckIcon />
              </span>
            ) : (
              <span className="text-slate-800 dark:text-slate-100">
                <CheckBoxOutlineBlankIcon />
              </span>
            )}
            <div className="flex flex-col gap-0 p-1 sm:p-2 line-clamp-1">
              <Typography variant="body2" color={checked ? "secondary" : "primary"} bold truncate>
                {todo}
              </Typography>
              <Typography variant="caption" color={checked ? "secondary" : "primary"} truncate>
                {`${months[date.getMonth()]} ${date.getDate()}`}
              </Typography>
            </div>
          </div>
          {!checked && (
            <div className="flex flex-row gap-0">
              <IconButton onClick={onEdit}>
                <EditIcon />
              </IconButton>
              <IconButton loading={loading} onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
