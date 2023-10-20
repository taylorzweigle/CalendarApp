//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import Typography from "../typography/Typography";

const ToggleSwitch = ({ label }) => {
  const [selected, setSelected] = useState(false);

  return (
    <label className="inline-flex relative items-center mr-0 cursor-pointer gap-4">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={selected}
        onClick={() => {
          setSelected(!selected);
        }}
      />
      <div className="w-16 h-8 bg-slate-100 dark:bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-600 after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-7 after:w-7"></div>
      <Typography variant="body1" color="text-slate-700 dark:text-white">
        {label}
      </Typography>
    </label>
  );
};

export default ToggleSwitch;
