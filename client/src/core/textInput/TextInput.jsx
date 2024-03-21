//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const TextInput = ({ label, value, type, pattern, inputMode, error, showLabel, onChange }) => {
  const input = () => {
    return (
      <input
        type={type}
        pattern={pattern}
        inputMode={inputMode}
        id={label}
        value={value}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border-2 border-slate-400 dark:border-slate-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
      />
    );
  };

  return showLabel ? (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="body1" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      {input()}
      {error && (
        <Typography variant="body2" color="text-red-500 dark:text-red-500">
          {error}
        </Typography>
      )}
    </div>
  ) : (
    input()
  );
};

export default TextInput;
