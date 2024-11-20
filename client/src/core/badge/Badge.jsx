//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

const Badge = forwardRef(({ size, inset }, ref) => {
  let positionClass = "";
  let rippleClass = "";
  let sizeClass = "";

  switch (size) {
    case "small":
      positionClass = inset ? "top-2 right-2" : "top-0 right-2";
      rippleClass = "-m-1";
      sizeClass = "w-3 h-3";
      break;
    case "large":
      positionClass = inset ? "top-2 right-2" : "top-0 right-0";
      rippleClass = "-m-2";
      sizeClass = "w-4 h-4";
      break;
    default:
      positionClass = inset ? "top-2 right-2" : "top-0 right-2";
      rippleClass = "-m-1";
      sizeClass = "w-3 h-3 -m-1";
      break;
  }

  return (
    <span ref={ref} className={`absolute ${positionClass} flex ${sizeClass} ${rippleClass}`}>
      <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-rose-800 dark:bg-rose-200 opacity-75"></span>
      <span
        className={`relative inline-flex rounded-full ${sizeClass} bg-rose-400 dark:bg-rose-500 border border-rose-800 dark:border-rose-200`}
      ></span>
    </span>
  );
});

export default Badge;
