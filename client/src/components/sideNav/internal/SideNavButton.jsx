//Taylor Zweigle, 2024
import React from "react";

import Typography from "../../../core/typography/Typography";

const SideNavButton = ({ title, icon, selected, onClick }) => {
  return (
    <div
      className={`flex flex-row md:flex-col justify-center items-center gap-2 h-16 w-full md:w-16 p-4 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none md:rounded-tl-lg md:rounded-tr-none md:rounded-br-none md:rounded-bl-lg ${
        selected
          ? "bg-white dark:bg-slate-800 border-t border-r md:border-r-0 border-l border-b-0 md:border-b border-slate-300 dark:border-slate-600"
          : "bg-slate-200 dark:bg-slate-950 border-b md:border-b-0 border-r-0 md:border-r border-slate-300 dark:border-slate-600"
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className={selected ? "text-slate-800 dark:text-white" : "text-slate-500 dark:text-slate-400"}>{icon}</div>
      <span className="block md:hidden">
        <Typography variant="body1" color={selected ? "primary" : "secondary"}>
          {title}
        </Typography>
      </span>
    </div>
  );
};

export default SideNavButton;
