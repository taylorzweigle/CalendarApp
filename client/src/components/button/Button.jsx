//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Button = ({ prefix, onClick, children }) => {
  return (
    <button
      className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-500 dark:border-slate-500 rounded-lg px-4 h-12"
      onClick={onClick}
    >
      <div className="flex flex-row gap-1 justify-center items-center">
        {prefix ? <span className="text-slate-700 dark:text-white">{prefix}</span> : null}
        {children ? (
          <Typography variant="body1" color="text-slate-700 dark:text-white">
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
