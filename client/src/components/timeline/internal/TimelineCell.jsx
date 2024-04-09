//Taylor Zweigle, 2023
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";

import Typography from "../../../core/typography/Typography";

import { compareStartAndEndTimes, formatTime, getColors, getIcons } from "../../../utility/utility";

const TimelineCell = ({ rowSpan, event, color, tag, startTime, endTime, hover, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  const colors = getColors(color);

  const icon = getIcons(tag);

  return (
    <td
      className={`h-12 align-top ${
        event
          ? `${colors.bg} border ${colors.border} overflow-clip pr-2 pl-2`
          : "border-t border-slate-300 dark:border-slate-600"
      } cursor-pointer`}
      rowSpan={rowSpan}
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {hover && isHover && (
        <div className="flex w-full h-full justify-center items-center text-sky-500 dark:text-sky-300 hover:border-2 hover:border-sky-500 hover:dark:border-sky-300 rounded-md">
          <AddIcon fontSize="small" />
        </div>
      )}
      {!hover && event && (
        <div className={`flex flex-row items-center`}>
          <div className={`flex justify-center items-center ${colors.icon} rounded w-6 h-6`}>{icon}</div>
          <div className="flex flex-col gap-0 p-1 line-clamp-1">
            <Typography variant="body2" color={colors.icon} bold truncate>
              {event}
            </Typography>
            {!compareStartAndEndTimes(startTime, endTime) && (
              <Typography variant="caption" color={colors.text} truncate>
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
