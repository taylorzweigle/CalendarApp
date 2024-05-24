//Taylor Zweigle, 2023
import React from "react";

import AddIcon from "@mui/icons-material/Add";

import Typography from "../../../core/typography/Typography";

import { compareStartAndEndTimes, formatTime, getColors, getIcons } from "../../../utility/utility";

const TimelineCell = ({ rowSpan, event, color, tag, currentHour, startTime, endTime, hover, onClick }) => {
  const colors = getColors(color);
  const icon = getIcons(tag);

  return (
    <td
      className={`group h-12 align-top ${
        event
          ? `${colors.bg} ${colors.active} border ${colors.border} overflow-clip pr-2 pl-2`
          : currentHour
          ? "border-t-2 border-rose-300 dark:border-rose-600"
          : "border-t border-slate-300 dark:border-slate-600"
      } cursor-pointer`}
      rowSpan={rowSpan}
      onClick={onClick}
    >
      {hover && (
        <div className="hidden w-full h-full justify-center items-center text-sky-500 dark:text-sky-300 hover:border-2 sm:hover:border-sky-500 sm:hover:dark:border-sky-300 group-active:border-sky-500 group-active:dark:border-sky-300 sm:group-hover:flex group-active:flex rounded-md">
          <AddIcon fontSize="small" />
        </div>
      )}
      {!hover && event && (
        <div className={`flex flex-row items-center`}>
          <div className={`flex justify-center items-center ${colors.icon} rounded w-6 h-6`}>{icon}</div>
          <div className="flex flex-col gap-0 p-1 line-clamp-1">
            <Typography variant="body2" color="custom" customColor={colors.icon} bold truncate>
              {event}
            </Typography>
            {!compareStartAndEndTimes(startTime, endTime) && (
              <Typography variant="caption" color="custom" customColor={colors.text} truncate>
                {`${formatTime(startTime)} - ${formatTime(endTime)}`}
              </Typography>
            )}
          </div>
        </div>
      )}
    </td>
  );
};

export default TimelineCell;
