//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const AreaTextInput = ({ label, value, rows, maxLength, error, showLabel, onChange }) => {
  const input = () => {
    return (
      <textarea
        id={label}
        value={value}
        rows={rows}
        maxLength={maxLength}
        onChange={onChange}
        className="bg-white dark:bg-slate-950 border-2 border-slate-400 dark:border-slate-600 sm:hover:border-sky-500 sm:hover:dark:border-sky-600 text-slate-950 dark:text-white text-md w-full rounded-lg p-4 resize-none"
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

export default AreaTextInput;
