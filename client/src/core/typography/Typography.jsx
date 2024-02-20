//Taylor Zweigle, 2024
import React from "react";

const Typography = ({ variant, color, bold, truncate, center, children }) => {
  let variantClass = "";

  switch (variant) {
    case "title":
      variantClass = "text-3xl";
      break;
    case "heading":
      variantClass = "text-xl";
      break;
    case "subheading":
      variantClass = "text-lg";
      break;
    case "body1":
      variantClass = "text-base";
      break;
    case "body2":
      variantClass = "text-sm";
      break;
    case "caption":
      variantClass = "text-xs";
      break;
    default:
      variantClass = "text-base";
  }

  return (
    <p
      className={`${variantClass} ${color ? color : "text-slate-700 dark:text-white"} ${bold ? "font-bold" : null} ${
        truncate && "line-clamp-1"
      } ${center && "text-center"}`}
    >
      {children}
    </p>
  );
};

export default Typography;
