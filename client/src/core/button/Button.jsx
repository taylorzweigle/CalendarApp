//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Button = ({ prefix, variant, fullWidth, onClick, children }) => {
  let variantClass = "";

  switch (variant) {
    case "default":
      variantClass =
        "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-500 dark:border-slate-500";
      break;
    case "primary":
      variantClass =
        "bg-sky-400 dark:bg-sky-700 hover:bg-sky-300 dark:hover:bg-sky-600 border border-sky-800 dark:border-sky-500";
      break;
    case "error":
      variantClass =
        "bg-rose-400 dark:bg-rose-700 hover:bg-rose-300 dark:hover:bg-rose-600 border border-rose-800 dark:border-rose-500";
      break;
    case "text":
      variantClass = "bg-transparent dark:bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700";
      break;
    default:
      variantClass =
        "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-500 dark:border-slate-500";
  }

  return (
    <button className={`${variantClass} ${fullWidth && "w-full"} rounded-lg px-4 h-12`} onClick={onClick}>
      <div className="flex flex-row gap-1 justify-center items-center">
        {prefix ? <span className="text-slate-700 dark:text-white">{prefix}</span> : null}
        {children ? (
          <Typography variant="body1" color="primary">
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
