//Taylor Zweigle, 2024
import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import Badge from "../../core/badge/Badge";
import IconButton from "../../core/iconButton/IconButton";
import Label from "../../core/label/Label";
import Typography from "../../core/typography/Typography";

const TodoCard = ({ todo, tag, dueDate, checked, badge, loading, onClick, onDelete }) => {
  const today = new Date();
  const date = new Date(dueDate);

  return (
    <div className="relative">
      <div
        className={`flex flex-row justify-start items-center cursor-pointer h-14 bg-slate-50 dark:bg-slate-700 border border-slate-500 dark:border-slate-400 rounded-md overflow-clip px-2`}
      >
        {badge && <Badge size="large" />}
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2" onClick={onClick}>
            {checked ? (
              <span className="text-slate-950 dark:text-white">
                <CheckIcon />
              </span>
            ) : (
              <Label
                size="small"
                variant={
                  today.getMonth() === date.getMonth() &&
                  today.getDate() === date.getDate() &&
                  today.getFullYear() === date.getFullYear()
                    ? "error"
                    : "default"
                }
              >
                {`${date.getMonth() + 1}/${date.getDate()}`}
              </Label>
            )}
            <div className="flex flex-col gap-0 p-1 sm:p-2 line-clamp-1">
              <Typography variant="body2" color="primary" bold truncate>
                {todo}
              </Typography>
              <Typography variant="caption" color="secondary" truncate>
                {tag}
              </Typography>
            </div>
          </div>
          <IconButton loading={loading} onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
