//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const TextInput = ({ label, value, type, pattern, inputMode, maxLength, error, showLabel, onChange }) => {
  const input = () => {
    return (
      <input
        id={label}
        value={value}
        type={type}
        pattern={pattern}
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border-2 border-slate-400 dark:border-slate-600 sm:hover:border-sky-800 sm:hover:dark:border-sky-600 text-slate-950 dark:text-white text-md w-full rounded-lg px-4 h-12"
      />
    );
  };

  return showLabel ? (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="body1" color="primary">
        {label}
      </Typography>
      {input()}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </div>
  ) : (
    input()
  );
};

export default TextInput;
