//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const TextInput = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <input
        type="text"
        id={label}
        value={value}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
      />
    </div>
  );
};

export default TextInput;
