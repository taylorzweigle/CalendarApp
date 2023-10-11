//Taylor Zweigle, 2023
"use client";

import React from "react";

const Chip = ({ selected, onClick, children }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full w-24 h-12 ${
        selected ? "bg-slate-700 dark:bg-slate-600 text-white" : "text-slate-900 dark:text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Chip;
