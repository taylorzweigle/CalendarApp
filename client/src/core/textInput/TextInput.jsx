//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const TextInput = ({ label, value, type, error, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border-2 border-slate-400 dark:border-slate-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
      />
      {error && (
        <Typography variant="body2" color="text-red-500 dark:text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TextInput;
