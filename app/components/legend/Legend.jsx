//Taylor Zweigle, 2023
"use-client";

import React from "react";

import Typography from "../typography/Typography";

const Legend = ({ color, label }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className={`bg-${color}-50 border border-${color}-500 rounded-lg w-5 h-5`}>&nbsp;</div>
      <Typography variant="body1">{label}</Typography>
    </div>
  );
};

export default Legend;
