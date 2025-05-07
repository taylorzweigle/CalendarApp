//Taylor Zweigle, 2025
import React from "react";

import { getColors, getIcons } from "../../utility/utility";

import Badge from "../../core/badge/Badge";
import Typography from "../../core/typography/Typography";

const CalendarCard = ({ event, color, tag, type, badge }) => {
  let borderClass = "";
  let marginClass = "";
  let roundedClass = "";

  const colors = getColors(color);
  const icon = getIcons(tag);

  switch (type) {
    case "start":
      borderClass = "border-t border-b border-l";
      marginClass = "ml-1 sm:ml-2 -mr-1 sm:-mr-1";
      roundedClass = "rounded-tr-none rounded-tl-md rounded-br-none rounded-bl-md";
      break;
    case "end":
      borderClass = "border-t border-r border-b";
      marginClass = "-ml-1 sm:-ml-1 mr-1 sm:mr-2";
      roundedClass = "rounded-tr-md rounded-tl-none rounded-br-md rounded-bl-none";
      break;
    case "middle":
      borderClass = "border-t border-b";
      marginClass = "-ml-1 sm:-ml-1 -mr-1 sm:-mr-1";
      roundedClass = "rounded-tr-none rounded-tl-none rounded-br-none rounded-bl-none";
      break;
    default:
      borderClass = "border-t border-r border-b border-l";
      marginClass = "ml-1 sm:ml-2 mr-1 sm:mr-2";
      roundedClass = "rounded-tr-md rounded-tl-md rounded-br-md rounded-bl-md";
  }

  const renderElement = (criteria) => {
    if (type === undefined || type === criteria) {
      return true;
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-row gap-1 p-1 sm:p-2 justify-start items-center h-6 md:h-8 ${colors.bg} ${borderClass} ${colors.border} ${roundedClass} ${marginClass}`}
      >
        {badge && renderElement("end") && <Badge size="small" inset={false} />}
        {renderElement("start") && (
          <>
            <div className={`flex justify-center items-center ${colors.icon} rounded w-6 h-6`}>{icon}</div>
            <Typography
              variant="body2"
              color="custom"
              customColor={colors.text}
              bold
              truncate
              additionalClasses="hidden sm:hidden md:block"
            >
              {event}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarCard;
