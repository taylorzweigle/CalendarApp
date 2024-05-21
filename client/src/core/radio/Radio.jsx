//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Radio = ({ id, name, value, checked, onChange }) => {
  return (
    <div className="flex flex-row gap-2 items-center cursor-pointer">
      <input
        type="radio"
        className="w-5 h-5 cursor-pointer"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {value}
      </Typography>
    </div>
  );
};

export default Radio;
