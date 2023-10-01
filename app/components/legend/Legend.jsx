//Taylor Zweigle, 2023

"use-client";

import React from "react";

const Legend = ({ color, label }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className={`bg-${color}-50 border border-${color}-500 rounded-lg w-5 h-5`}>&nbsp;</div>
      <p className="text-lg">{label}</p>
    </div>
  );
};

export default Legend;
