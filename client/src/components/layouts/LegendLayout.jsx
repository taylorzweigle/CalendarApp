//Taylor Zweigle, 2024
import React from "react";

import Legend from "../../core/legend/Legend";
import Typography from "../../core/typography/Typography";

import { calendars } from "../../utility/calendars";

const LegendLayout = ({ onClick }) => {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="subheading">Calendars</Typography>
        <div className={`flex flex-col sm:flex-row md:flex-col sm:w-full sm:justify-between gap-2 sm:gap-8 md:gap-2`}>
          {calendars.map((calendar) => (
            <Legend key={calendar.id} color={calendar.color} label={calendar.user} onClick={onClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegendLayout;
