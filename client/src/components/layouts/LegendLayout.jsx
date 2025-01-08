//Taylor Zweigle, 2025
import React from "react";

import ReplayIcon from "@mui/icons-material/Replay";

import * as Actions from "../../actions";

import { getCalendars, updateCalendar } from "../../api/calendars";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useCalendarsContext } from "../../hooks/useCalendarsContext";

import Legend from "../legend/Legend";

import IconButton from "../../core/iconButton/IconButton";
import Typography from "../../core/typography/Typography";

const LegendLayout = () => {
  const { user: authUser } = useAuthContext();
  const { calendars, dispatchCalendars } = useCalendarsContext();

  const handleLegendChange = async (calendar) => {
    toggleCalendarVisibility(calendar, !calendar.visible);
  };

  const handleLegendReset = async () => {
    for (let i = 0; i < calendars.length; i++) {
      toggleCalendarVisibility(calendars[i], true);
    }
  };

  const toggleCalendarVisibility = async (calendar, visible) => {
    const newCalendar = { ...calendar, visible: visible };

    const json = await updateCalendar(calendar._id, newCalendar, authUser.token);

    if (json.json) {
      const calendars = await getCalendars(authUser.token);

      if (calendars.json) {
        dispatchCalendars({ type: Actions.GET_CALENDARS, payload: calendars.json });
      }
    }
  };

  const hiddenCalendars = () => {
    let hidden = 0;

    for (let i = 0; i < calendars.length; i++) {
      if (!calendars[i].visible) {
        hidden++;
      }
    }

    return hidden;
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center h-10 -mr-2">
          <Typography variant="subheading" color="primary">
            Calendars
          </Typography>
          <span className={hiddenCalendars() ? "block" : "hidden"}>
            <IconButton onClick={handleLegendReset}>
              <ReplayIcon />
            </IconButton>
          </span>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col sm:w-full sm:justify-between gap-2 sm:gap-8 md:gap-2">
          {calendars &&
            calendars.map((calendar) => (
              <Legend
                key={calendar._id}
                color={calendar.color}
                label={calendar.calendar}
                selected={calendar.visible}
                onClick={() => handleLegendChange(calendar)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
