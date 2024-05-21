//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Tab = ({ value, selected, onClick }) => {
  return (
    <div
      className={`flex flex-row justify-center items-center h-12 w-full ${
        selected && "border-b-4 border-sky-500"
      } cursor-pointer`}
      onClick={onClick}
    >
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {value}
      </Typography>
    </div>
  );
};

export default Tab;
