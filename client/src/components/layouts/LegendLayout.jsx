//Taylor Zweigle, 2025
import React from "react";

import ReplayIcon from "@mui/icons-material/Replay";

import * as Actions from "../../actions";

import { useVisibleCalendarsContext } from "../../hooks/useVisibleCalendarsContext";

import Legend from "../../core/legend/Legend";
import Typography from "../../core/typography/Typography";
import IconButton from "../../core/iconButton/IconButton";

const LegendLayout = ({ calendars }) => {
  const { visibleCalendars, dispatchVisibleCalendars } = useVisibleCalendarsContext();

  const handleLegendChange = (calendar) => {
    if (visibleCalendars.length === 1) {
      if (visibleCalendars.includes(calendar)) {
        dispatchVisibleCalendars({
          type: Actions.SET_VISIBLE_CALENDARS,
          payload: calendars.map((calendar) => calendar.calendar),
        });
      } else {
        dispatchVisibleCalendars({
          type: Actions.SET_VISIBLE_CALENDARS,
          payload: calendars
            .map((calendar) => calendar.calendar)
            .filter((visibleCalendar) => visibleCalendar === calendar),
        });
      }
    } else {
      dispatchVisibleCalendars({
        type: Actions.SET_VISIBLE_CALENDARS,
        payload: visibleCalendars.filter((visibleCalendar) => visibleCalendar === calendar),
      });
    }
  };

  const handleLegendReset = () => {
    dispatchVisibleCalendars({
      type: Actions.SET_VISIBLE_CALENDARS,
      payload: calendars.map((calendar) => calendar.calendar),
    });
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center h-10 -mr-2">
          <Typography variant="subheading" color="primary">
            Calendars
          </Typography>
          <span className={visibleCalendars.length < calendars.length ? "block" : "hidden"}>
            <IconButton color="default" onClick={handleLegendReset}>
              <ReplayIcon />
            </IconButton>
          </span>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col sm:w-full sm:justify-between gap-2 sm:gap-8 md:gap-2">
          {calendars &&
            calendars.map((calendar) => (
              <Legend
                key={calendar.calendar}
                color={calendar.color}
                label={calendar.calendar}
                selected={visibleCalendars.includes(calendar.calendar)}
                onClick={() => handleLegendChange(calendar.calendar)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
