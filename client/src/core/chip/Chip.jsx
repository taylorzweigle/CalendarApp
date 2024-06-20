//Taylor Zweigle, 2024
import React from "react";

const Chip = ({ selected, onClick, children }) => {
  return (
    <button
      className={`flex items-center justify-center sm:hover:bg-slate-200 sm:hover:dark:bg-slate-700 active:bg-slate-200 active:dark:bg-slate-700 rounded-lg w-20 h-12 ${
        selected
          ? "bg-transparent text-slate-900 dark:text-white border-2 border-sky-600 dark:border-sky-400"
          : "text-slate-700 dark:text-slate-300"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Chip;
