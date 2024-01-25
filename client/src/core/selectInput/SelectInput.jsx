//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const SelectInput = ({ label, value, error, items, showLabel, onChange }) => {
  const select = () => {
    return (
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border-2 border-slate-400 dark:border-slate-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };

  return showLabel ? (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      {select()}
      {error && (
        <Typography variant="body2" color="text-red-500 dark:text-red-500">
          {error}
        </Typography>
      )}
    </div>
  ) : (
    select()
  );
};

export default SelectInput;
