//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Tab = ({ value, selected, onClick }) => {
  return (
    <div
      className={`flex flex-row justify-center items-center h-12 w-full border-b-4 ${
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
