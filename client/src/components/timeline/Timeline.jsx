//Taylor Zweigle, 2024
import React from "react";
import { useNavigate } from "react-router";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import TimelineCell from "./internal/TimelineCell";

import Typography from "../../core/typography/Typography";

const Timeline = ({ data, calendars, onHourClick }) => {
  const navigate = useNavigate();

  const { selectedDate } = useSelectedDateContext();

  const hours = ["All Day", 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  const formatTime = (time) => `${time % 12 === 0 ? 12 : time % 12}${time >= 12 ? "pm" : "am"} `;

  const renderTableCell = (hour) => {
    let tableCell = null;

    const isEventInDay = (event, selectedDate) => {
      return (
        new Date(event.startTime).getMonth() === selectedDate.month &&
        new Date(event.startTime).getDate() === selectedDate.date &&
        new Date(event.startTime).getFullYear() === selectedDate.year
      );
    };

    const calculateRowSpan = (event) => new Date(event.endTime).getHours() - new Date(event.startTime).getHours();

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (isEventInDay(data[i], selectedDate) && hour === new Date(data[i].startTime).getHours()) {
          tableCell = (
            <TimelineCell
              rowSpan={calculateRowSpan(data[i]) === 0 ? 1 : calculateRowSpan(data[i])}
              event={data[i].event}
              tag={data[i].tag}
              color={calendars.find((calendar) => calendar.user === data[i].user).color}
              startTime={new Date(data[i].startTime)}
              endTime={new Date(data[i].endTime)}
              onClick={() => navigate(`/event/${data[i]._id}`)}
            />
          );
          break;
        } else if (
          isEventInDay(data[i], selectedDate) &&
          new Date(data[i].startTime).getHours() === new Date(data[i].endTime).getHours() &&
          new Date(data[i].startTime).getMinutes() === new Date(data[i].endTime).getMinutes() &&
          hour === "All Day"
        ) {
          tableCell = (
            <TimelineCell
              rowSpan={1}
              event={data[i].event}
              tag={data[i].tag}
              color={calendars.find((calendar) => calendar.user === data[i].user).color}
              startTime={new Date(data[i].startTime)}
              endTime={new Date(data[i].endTime)}
              onClick={() => navigate(`/event/${data[i]._id}`)}
            />
          );
          break;
        } else if (
          isEventInDay(data[i], selectedDate) &&
          hour > new Date(data[i].startTime).getHours() &&
          hour < new Date(data[i].endTime).getHours()
        ) {
          tableCell = null;
          break;
        } else {
          tableCell = <TimelineCell hover onClick={() => onHourClick(hour)} />;
        }
      }
    }

    return tableCell;
  };

  return (
    <table className="w-full h-192">
      <tbody className="h-full">
        {hours.map((hour) => (
          <tr key={hour} className="h-px">
            <td className={`h-12 w-16 border-t border-slate-300 dark:border-slate-600`}>
              <Typography variant="body1">{typeof hour === "string" ? hour : formatTime(hour)}</Typography>
            </td>
            {renderTableCell(hour)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Timeline;
