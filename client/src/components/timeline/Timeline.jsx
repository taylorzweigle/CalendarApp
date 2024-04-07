//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import TimelineCell from "./internal/TimelineCell";

import TimelineCard from "../cards/TimelineCard";

import Typography from "../../core/typography/Typography";

const Timeline = ({ data, calendars, onSelectDay }) => {
  const { selectedDate } = useSelectedDateContext();

  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  const formatTime = (time) => `${time % 12 === 0 ? 12 : time % 12}${time >= 12 ? "pm" : "am"} `;

  const handleHourClick = (hour) => {};

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
            <TimelineCell rowSpan={calculateRowSpan(data[i])}>
              &nbsp;
              {/*<Link key={data[i]._id} to={`/event/${data[i]._id}`}>
                <TimelineCard
                  event={data[i].event}
                  startTime={new Date(data[i].startTime)}
                  endTime={new Date(data[i].endTime)}
                  color={calendars.find((calendar) => calendar.user === data[i].user).color}
                  tag={data[i].tag}
                />
          </Link>*/}
            </TimelineCell>
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
          tableCell = <TimelineCell onClick={() => handleHourClick(hour)}>&nbsp;</TimelineCell>;
        }
      }
    } else {
      tableCell = <TimelineCell onClick={() => handleHourClick(hour)}>&nbsp;</TimelineCell>;
    }

    return tableCell;
  };

  return (
    <table className="w-full">
      <tbody>
        {hours.map((hour) => (
          <tr key={hour} className="h-12">
            <TimelineCell>
              <Typography variant="body1">{formatTime(hour)}</Typography>
            </TimelineCell>
            {renderTableCell(hour)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Timeline;
