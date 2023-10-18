//Taylor Zweigle, 2023
"use client";

import React from "react";

import Typography from "../typography/Typography";

import { getColors, getIcons } from "../../utility/utility";

const EventCard = ({ event, time, color, tag, condensed }) => {
  const colors = getColors(color);

  const icon = getIcons(tag);

  return (
    <div
      className={`flex flex-row justify-start items-center ${condensed ? "h-8" : "h-14"} ${colors.bg} border ${
        colors.border
      } rounded-md overflow-clip ${condensed ? "px-0" : "px-2"}`}
    >
      {condensed ? null : (
        <div className={`flex justify-center items-center ${colors.bgSolid} text-white rounded w-6 h-6`}>{icon}</div>
      )}
      <div className="flex flex-col gap-0 p-2">
        <Typography variant="body2" color={colors.text} bold>
          {event}
        </Typography>
        {condensed ? null : (
          <Typography variant="caption" color={colors.text}>
            {`${
              time.getHours() === 0
                ? "All Day"
                : `${time.getHours() % 12}:${time.getMinutes() === 0 ? "00" : time.getMinutes()} ${
                    time.getHours() > 11 ? "PM" : "AM"
                  } - ${(time.getHours() % 12) + 1}:${time.getMinutes() === 0 ? "00" : time.getMinutes()} ${
                    time.getHours() > 11 ? "PM" : "AM"
                  }`
            }
            `}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default EventCard;
