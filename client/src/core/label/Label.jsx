//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const Label = ({ size, variant, children }) => {
  let sizeClass = "";
  let variantClass = "";

  switch (size) {
    case "small":
      sizeClass = "w-3 sm:w-12 h-3 sm:h-6";
      break;
    case "medium":
      sizeClass = "pl-4 pr-4 h-10";
      break;
    default:
      sizeClass = "pl-4 pr-4 h-10";
  }

  switch (variant) {
    case "default":
      variantClass = "bg-slate-200 dark:bg-slate-700";
      break;
    case "primary":
      variantClass = "bg-sky-300 dark:bg-sky-700";
      break;
    case "error":
      variantClass = "bg-rose-300 dark:bg-rose-700";
      break;
    case "text":
      variantClass = "bg-transparent dark:bg-transparent";
      break;
    default:
      variantClass = "bg-slate-200 dark:bg-slate-700";
  }

  return (
    <div className={`flex flex-row justify-center items-center ${variantClass} ${sizeClass} rounded-full `}>
      <Typography variant={size === "small" ? "caption" : "body1"} color="primary">
        {children}
      </Typography>
    </div>
  );
};

export default Label;
