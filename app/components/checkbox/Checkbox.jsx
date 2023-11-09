//Taylor Zweigle, 2023
"use client";

import React, { useState } from "react";

const Checkbox = ({ onClick }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer">
      <input id="checkbox" className="h-5 w-5 cursor-pointer" type="checkbox" onClick={handleClick} />
      <label htmlFor="checkbox" className="text-base text-slate-700 dark:text-white cursor-pointer">
        All Day
      </label>
    </div>
  );
};

export default Checkbox;
