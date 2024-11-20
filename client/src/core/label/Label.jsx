//Taylor Zweigle, 2024
import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";

import Typography from "../typography/Typography";

const Label = forwardRef(({ size, variant, children }, ref) => {
  const labelVariants = cva("flex flex-row justify-center items-center rounded-full", {
    variants: {
      size: {
        small: "pl-2 pr-2 h-6",
        medium: "pl-4 pr-4 h-10",
      },
      variant: {
        default: "bg-slate-300 dark:bg-slate-600",
        primary: "bg-sky-300 dark:bg-sky-500",
        error: "bg-rose-300 dark:bg-rose-500",
        text: "bg-transparent dark:bg-transparent",
      },
    },
    defaultVariants: {
      size: "small",
      variant: "default",
    },
  });

  return (
    <div ref={ref} className={labelVariants(size, variant)}>
      <Typography variant={size === "small" ? "caption" : "body1"} color="primary">
        {children}
      </Typography>
    </div>
  );
});

export default Label;
