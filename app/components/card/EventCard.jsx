//Taylor Zweigle, 2023
"use client";

import React from "react";

import Typography from "../typography/Typography";

import { getColors, getIcons } from "../../utility/utility";

const EventCard = ({ event, time, color, tag, isCondensed }) => {
  const colors = getColors(color);

  const icon = getIcons(tag);

  return (
    <div
      className={`flex flex-row justify-start items-center ${isCondensed ? "h-8" : "h-14"} ${colors.bg} border ${
        colors.border
      } rounded-md overflow-clip ${isCondensed ? "px-0" : "px-2"}`}
    >
      {isCondensed ? null : (
        <div className={`flex justify-center items-center ${colors.bgSolid} text-white rounded w-6 h-6`}>{icon}</div>
      )}
      <div className="flex flex-col gap-0 p-2">
        <Typography variant="body2" color={colors.text} isBold>
          {event}
        </Typography>
        {isCondensed ? null : (
          <Typography variant="caption" color={colors.text}>
            {time}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default EventCard;
