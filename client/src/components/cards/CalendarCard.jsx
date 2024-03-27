//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../core/typography/Typography";

import { getColors, getIcons } from "../../utility/utility";

const CalendarCard = ({ event, color, tag, outOfMonth }) => {
  const colors = getColors(color);

  const icon = getIcons(tag);

  return (
    <div
      className={`flex flex-row gap-1 p-1 sm:p-2 justify-start items-center h-6 md:h-8 ${
        outOfMonth ? "bg-transparent" : colors.bg
      } border ${colors.border} rounded-md overflow-clip line-clamp-1`}
    >
      <div className={`flex justify-center items-center ${colors.icon} rounded w-6 h-6`}>{icon}</div>
      <Typography variant="body2" color={colors.text} bold truncate>
        <span className="hidden sm:hidden md:block">{event}</span>
      </Typography>
    </div>
  );
};

export default CalendarCard;
