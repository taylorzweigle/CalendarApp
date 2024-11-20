//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const Chip = forwardRef(
  ({ selected, secondarySelected, disabled, size, circle, onClick, children }, ref) => {
    let sizeClass = "";

    switch (size) {
      case "small":
        sizeClass = circle ? "h-11 w-11" : "h-11 w-18";
        break;
      case "default":
        sizeClass = circle ? "h-12 w-12" : "h-12 w-20";
        break;
      default:
        sizeClass = circle ? "h-12 w-12" : "h-12 w-20";
    }

    return (
      <div
        ref={ref}
        className={`inline-flex justify-center items-center ${sizeClass} rounded-full ${
          selected
            ? "bg-sky-500 dark:bg-sky-500"
            : secondarySelected
            ? "border-2 border-sky-500 dark:border-sky-500"
            : !disabled &&
              "active:bg-sky-200 active:dark:bg-slate-700 md:hover:bg-sky-200 md:hover:dark:bg-slate-700"
        } cursor-pointer`}
        onClick={onClick}
      >
        <Typography variant="body" color={selected ? "base" : disabled ? "secondary" : "primary"}>
          {children}
        </Typography>
      </div>
    );
  }
);

export default Chip;
