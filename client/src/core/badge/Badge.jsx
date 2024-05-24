//Taylor Zweigle, 2024
import React from "react";

const Badge = ({ size }) => {
  let sizeClass = "";

  switch (size) {
    case "small":
      sizeClass = "w-3 h-3 -m-1";
      break;
    case "large":
      sizeClass = "w-4 h-4 -m-2";
      break;
    default:
      sizeClass = "w-3 h-3 -m-1";
      break;
  }

  return (
    <div
      className={`absolute right-0 top-0 bg-rose-400 dark:bg-rose-500 border border-rose-800 dark:border-rose-200 ${sizeClass} rounded-full`}
    >
      &nbsp;
    </div>
  );
};

export default Badge;
