//Taylor Zweigle, 2024
import React from "react";

import ReplayIcon from "@mui/icons-material/Replay";

import Legend from "../../core/legend/Legend";
import Typography from "../../core/typography/Typography";
import IconButton from "../../core/iconButton/IconButton";

const LegendLayout = ({ calendars, visibleCalendars, showReset, onClick, onReset }) => {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center h-10 -mr-2">
          <Typography variant="subheading" color="primary">
            Calendars
          </Typography>
          <span className={showReset ? "block" : "hidden"}>
            <IconButton color="text-slate-950 dark:text-white" onClick={onReset}>
              <ReplayIcon />
            </IconButton>
          </span>
        </div>
        <div
          className={`flex flex-col sm:flex-row md:flex-col sm:w-full sm:justify-between gap-2 sm:gap-8 md:gap-2`}
        >
          {calendars &&
            calendars.map((calendar) => (
              <Legend
                key={calendar.id}
                color={calendar.color}
                label={calendar.user}
                selected={visibleCalendars && visibleCalendars.includes(calendar.user)}
                onClick={() => onClick(calendar.user)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
