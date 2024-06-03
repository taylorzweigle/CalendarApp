//Taylor Zweigle, 2024
import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import Badge from "../../core/badge/Badge";
import Checkbox from "../../core/checkbox/Checkbox";
import IconButton from "../../core/iconButton/IconButton";
import Typography from "../../core/typography/Typography";

const TodoCard = ({ todo, tag, selected, badge, loading, onDelete }) => {
  return (
    <div className="relative">
      <div
        className={`flex flex-row justify-start items-center cursor-pointer h-14 bg-slate-50 dark:bg-slate-700 border border-slate-500 dark:border-slate-400 rounded-md overflow-clip px-2`}
      >
        {badge && <Badge size="large" />}
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-0">
            <Checkbox selected={selected} />
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
