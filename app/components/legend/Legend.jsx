//Taylor Zweigle, 2023
"use client";

import React from "react";

import Typography from "../typography/Typography";

import { getColors } from "../../utility/utility";

const Legend = ({ color, label }) => {
  const colors = getColors(color);

  return (
    <div className="flex flex-row items-center gap-2">
      <div className={`${colors.bg} border ${colors.border} rounded-lg w-5 h-5`}>&nbsp;</div>
      <Typography variant="body1">{label}</Typography>
    </div>
  );
};

export default Legend;
