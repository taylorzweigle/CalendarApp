//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../core/typography/Typography";

import { compareStartAndEndTimes, formatTime, getColors, getIcons } from "../../utility/utility";

const EventCard = ({ event, startTime, endTime, color, tag, condensed, onClick }) => {
  const colors = getColors(color);

  const icon = getIcons(tag);

  return (
    <div
      className={`flex flex-row justify-start items-center cursor-pointer ${condensed ? "h-6 sm:h-6 md:h-8" : "h-14"} ${
        colors.bg
      } border ${colors.border} rounded-md overflow-clip ${condensed ? "px-0" : "px-2"}`}
      onClick={onClick}
    >
      {condensed ? null : <div className={`flex justify-center items-center ${colors.icon} rounded w-6 h-6`}>{icon}</div>}
      <div className="flex flex-col gap-0 p-1 sm:p-2 line-clamp-1">
        <Typography variant="body2" color={colors.text} bold truncate>
          <span className="block sm:block md:hidden">{condensed ? icon : event}</span>
          <span className="hidden sm:hidden md:block">{event}</span>
        </Typography>
        {condensed
          ? null
          : !compareStartAndEndTimes(startTime, endTime) && (
              <Typography variant="caption" color={colors.text} truncate>
                {`${formatTime(startTime)} - ${formatTime(endTime)}`}
              </Typography>
            )}
      </div>
    </div>
  );
};

export default EventCard;
