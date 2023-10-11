//Taylor Zweigle, 2023
"use client";

import React from "react";

const Typography = ({ variant, color, bold, children }) => {
  let variantClass = "text-base";

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
  }

  return (
    <p className={`${variantClass} ${color ? color : "text-slate-700 dark:text-white"} ${bold ? "font-bold" : null}`}>
      {children}
    </p>
  );
};

export default Typography;
