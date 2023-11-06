//Taylor Zweigle, 2023
"use client";

import React from "react";

import Typography from "../typography/Typography";

import { getColors } from "../../utility/utility";

const TotalsBar = ({ color, label, count }) => {
  const colors = getColors(color);

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="w-24">
        <Typography variant="body1">{label}</Typography>
      </div>
      <div className={`${colors.bg} rounded-lg w-full h-4`}>&nbsp;</div>
      <Typography variant="body1">{count}</Typography>
    </div>
  );
};

export default TotalsBar;
