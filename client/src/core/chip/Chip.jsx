//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Chip = ({ selected, secondarySelected, onClick, children }) => {
  return (
    <div
      className={`inline-flex justify-center items-center h-12 w-20 rounded-full ${
        selected
          ? "bg-sky-500 dark:bg-sky-500"
          : secondarySelected
          ? "border-2 border-sky-500 dark:border-sky-500"
          : "active:bg-sky-200 active:dark:bg-slate-700 md:hover:bg-sky-200 md:hover:dark:bg-slate-700"
      } cursor-pointer`}
      onClick={onClick}
    >
      <Typography variant="body" color={selected ? "white" : "primary"}>
        {children}
      </Typography>
    </div>
  );
};

export default Chip;
