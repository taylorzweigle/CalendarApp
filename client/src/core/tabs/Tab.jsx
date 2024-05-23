//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Tab = ({ value, selected, onClick }) => {
  return (
    <div
      className={`flex flex-row justify-center items-center h-12 w-full rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none border-b-4 sm:hover:bg-slate-50 sm:hover:dark:bg-slate-700 active:bg-slate-50 active:dark:bg-slate-700 ${
        selected ? "border-sky-500" : "border-transparent"
      } cursor-pointer`}
      onClick={onClick}
    >
      <Typography variant="body1" color={selected ? "primary" : "secondary"}>
        {value}
      </Typography>
    </div>
  );
};

export default Tab;
