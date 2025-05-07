//Taylor Zweigle, 2025
import React from "react";

import { compareStartAndEndTimes, formatTime, getColors, getIcons } from "../../utility/utility";

import Badge from "../../core/badge/Badge";
import Typography from "../../core/typography/Typography";

import { months } from "../calendar/Calendar";

const EventCard = ({
  event,
  startTime,
  endTime,
  showStartDate,
  showEndDate,
  allDay,
  color,
  tag,
  badge,
}) => {
  const colors = getColors(color);
  const icon = getIcons(tag);

  const renderTime = () => {
    let time = "";

    const startTimeString = `${months[startTime.getMonth()].slice(0, 3)} ${startTime.getDate()} `;
    const allDayStartTimeString = formatTime(startTime);
    const divier = " - ";
    const endTimeString = `${months[endTime.getMonth()].slice(0, 3)} ${endTime.getDate()} `;
    const allDayEndTimeString = formatTime(endTime);

    if (showStartDate) {
      time += startTimeString;
    }
    if (!allDay) {
      time += allDayStartTimeString;
    }

    time += divier;

    if (showEndDate) {
      time += endTimeString;
    }
    if (!allDay) {
      time += allDayEndTimeString;
    }

    return time;
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-row justify-start items-center cursor-pointer h-14 ${colors.bg} ${colors.hover} ${colors.active} border ${colors.border} rounded-md px-2`}
      >
        {badge && <Badge size="large" />}
        <div className={`flex justify-center items-center ${colors.icon} rounded w-6 h-6`}>{icon}</div>
        <div className="flex flex-col gap-0 p-1 sm:p-2 line-clamp-1">
          <Typography variant="body2" color="custom" customColor={colors.icon} bold truncate>
            {event}
          </Typography>
          {!compareStartAndEndTimes(startTime, endTime) && (
            <Typography
              variant="caption"
              color="custom"
              customColor={colors.text}
              truncate
              additionalClasses="inline-flex justify-start items-center gap-1"
            >
              {renderTime()}
            </Typography>
          )}
          {compareStartAndEndTimes(startTime, endTime) && (
            <Typography variant="caption" color="custom" customColor={colors.text} truncate>
              {`${months[startTime.getMonth()].slice(0, 3)} ${startTime.getDate()}`}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
