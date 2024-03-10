//Taylor Zweigle, 2024
import React from "react";

const Chip = ({ selected, onClick, children }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-lg w-20 h-12 ${
        selected
          ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-700 dark:border-slate-300"
          : "text-slate-900 dark:text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Chip;
