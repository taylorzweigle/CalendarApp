//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../core/typography/Typography";

import { getColors, getIcons } from "../../utility/utility";

const Details = ({ label, value, color, icon }) => {
  const colors = getColors(color);

  return (
    <div className="flex flex-row justify-between items-center">
      <Typography variant="body2" color="text-slate-700 dark:text-slate-300">
        {label}
      </Typography>
      <div className="flex flex-row gap-2 items-center">
        {color && <div className={`h-5 w-5 rounded-sm border ${colors.bg} ${colors.border}`}>&nbsp;</div>}
        {icon && <div className="text-slate-950 dark:text-white">{getIcons(icon)}</div>}
        <Typography variant="body1">{value}</Typography>
      </div>
    </div>
  );
};

export default Details;
