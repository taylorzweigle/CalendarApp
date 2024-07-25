//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";

import TimelineCell from "./internal/TimelineCell";

import Typography from "../../core/typography/Typography";

const Timeline = ({ data, calendars, onHourClick }) => {
  const navigate = useNavigate();

  const { selectedDate } = useSelectedDateContext();

  const [dataArray, setDataArray] = useState([]);

  const hours = [0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  const isCurrentTime = (hour) => {
    return (
      new Date().getMonth() === selectedDate.month &&
      new Date().getDate() === selectedDate.date &&
      new Date().getFullYear() === selectedDate.year &&
      new Date().getHours() === hour
    );
  };

  useEffect(() => {
    let tempDataArray = [];
    let conflict = false;

    if (data.length > 0) {
      tempDataArray.push([data[0]]);

      for (let i = 1; i < data.length; i++) {
        conflict = false;

        for (let j = 0; j < tempDataArray[0].length; j++) {
          if (
            (new Date(data[i].startTime).getHours() >= new Date(tempDataArray[0][j].startTime).getHours() &&
              new Date(data[i].startTime).getHours() < new Date(tempDataArray[0][j].endTime).getHours()) ||
            (new Date(data[i].endTime).getHours() >= new Date(tempDataArray[0][j].startTime).getHours() &&
              new Date(data[i].endTime).getHours() < new Date(tempDataArray[0][j].endTime).getHours()) ||
            data[i].allDay === tempDataArray[0][j].allDay
          ) {
            conflict = true;
          } else {
            conflict = false;
          }
        }

        conflict ? tempDataArray.push([data[i]]) : tempDataArray[0].push(data[i]);
      }
    }

    setDataArray(tempDataArray);
  }, [data]);

  const showBadge = (time) => new Date().getTime() - new Date(time).getTime() < 43200000;

  const formatTime = (time) => `${time % 12 === 0 ? 12 : time % 12}${time >= 12 ? "pm" : "am"} `;

  const renderTableCell = (hour, array) => {
    let tableCell = null;

    const isEventInDay = (event, selectedDate) => {
      return (
        new Date(event.startTime).getMonth() === selectedDate.month &&
        new Date(event.startTime).getDate() === selectedDate.date &&
        new Date(event.startTime).getFullYear() === selectedDate.year
      );
    };

    const calculateRowSpan = (event) =>
      new Date(event.endTime).getHours() - new Date(event.startTime).getHours();

    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        if (isEventInDay(array[i], selectedDate) && hour === new Date(array[i].startTime).getHours()) {
          tableCell = (
            <TimelineCell
              rowSpan={calculateRowSpan(array[i]) === 0 ? 1 : calculateRowSpan(array[i])}
              event={array[i].event}
              tag={array[i].tag}
              color={calendars.find((calendar) => calendar.user === array[i].user).color}
              currentHour={isCurrentTime(hour)}
              startTime={
                array[i].actualStartTime ? new Date(array[i].actualStartTime) : new Date(array[i].startTime)
              }
              endTime={
                array[i].actualEndTime ? new Date(array[i].actualEndTime) : new Date(array[i].endTime)
              }
              allDay={array[i].allDay}
              showStartDate={array[i].actualStartTime}
              showEndDate={array[i].actualEndTime}
              badge={showBadge(array[i].creationTime)}
              onClick={() => navigate(`/event/${array[i]._id}`)}
            />
          );
          break;
        } else if (
          isEventInDay(array[i], selectedDate) &&
          hour > new Date(array[i].startTime).getHours() &&
          hour < new Date(array[i].endTime).getHours()
        ) {
          tableCell = null;
          break;
        } else {
          tableCell = (
            <TimelineCell hover currentHour={isCurrentTime(hour)} onClick={() => onHourClick(hour)} />
          );
        }
      }
    } else {
      tableCell = (
        <TimelineCell hover currentHour={isCurrentTime(hour)} onClick={() => onHourClick(hour)} />
      );
    }

    return tableCell;
  };

  return (
    <table className="w-full">
      <tbody className="h-full">
        {hours.map((hour) => (
          <tr key={hour} className="h-px">
            <td
              className={`h-12 w-16 pl-2 md:pl-0 ${
                isCurrentTime(hour)
                  ? "border-t-2 border-rose-300 dark:border-rose-600"
                  : "border-t border-slate-300 dark:border-slate-600"
              } align-text-top`}
            >
              <Typography variant="body1" color="primary">
                {hour === 0 ? "All Day" : formatTime(hour)}
              </Typography>
            </td>
            {dataArray.length > 0
              ? dataArray.map((array) => (
                  <React.Fragment key={array[0]._id}>{renderTableCell(hour, array)}</React.Fragment>
                ))
              : renderTableCell(hour, [])}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Timeline;
