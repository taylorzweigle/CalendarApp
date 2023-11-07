//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

import Typography from "../typography/Typography";

const Checkbox = ({ onClick }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={handleClick}>
      <input className="h-5 w-5" type="checkbox" />
      <Typography variant="body1">All Day</Typography>
    </div>
  );
};

export default Checkbox;
