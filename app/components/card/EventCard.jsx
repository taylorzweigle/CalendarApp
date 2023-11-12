//Taylor Zweigle, 2023
"use client";

import React from "react";

import Typography from "../typography/Typography";

import { compareStartAndEndTimes, formatTime, getColors, getIcons } from "../../utility/utility";

const EventCard = ({ event, startTime, endTime, color, tag, condensed, onClick }) => {
  const colors = getColors(color);

  const icon = getIcons(tag);

  return (
    <div
      className={`flex flex-row justify-start items-center cursor-pointer ${condensed ? "h-8" : "h-14"} ${colors.bg} border ${
        colors.border
      } rounded-md overflow-clip ${condensed ? "px-0" : "px-2"}`}
      onClick={onClick}
    >
      {condensed ? null : <div className={`flex justify-center items-center ${colors.icon} rounded w-6 h-6`}>{icon}</div>}
      <div className="flex flex-col gap-0 p-2">
        <Typography variant="body2" color={colors.text} bold>
          {event}
        </Typography>
        {condensed
          ? null
          : !compareStartAndEndTimes(startTime, endTime) && (
              <Typography variant="caption" color={colors.text}>
                {`${formatTime(startTime)} - ${formatTime(endTime)}`}
              </Typography>
            )}
      </div>
    </div>
  );
};

export default EventCard;
