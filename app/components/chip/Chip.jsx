//Taylor Zweigle, 2023
"use client";

import React from "react";

const Chip = ({ isSelected, onClick, children }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full w-24 h-12 ${isSelected ? "bg-slate-700 text-white" : null}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Chip;
