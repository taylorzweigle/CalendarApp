//Taylor Zweigle, 2024
import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";

const Typography = forwardRef(
  ({ variant, color, customColor, bold, truncate, wrap, center, additionalClasses, children }, ref) => {
    const typographyVariants = cva(`${additionalClasses}`, {
      variants: {
        variant: {
          title: "text-3xl",
          heading: "text-xl",
          subheading: "text-lg",
          body1: "text-base",
          body2: "text-sm",
          caption: "text-xs",
        },
        color: {
          primary: "text-slate-700 dark:text-white",
          secondary: "text-slate-500 dark:text-slate-400",
          error: "text-rose-500 dark:text-rose-500",
          base: "text-white dark:text-white",
          custom: customColor,
        },
        bold: {
          true: "font-bold",
        },
        truncate: {
          true: "w-full overflow-hidden whitespace-nowrap text-ellipsis",
        },
        wrap: {
          true: "break-normal",
        },
        center: {
          true: "text-center",
        },
      },
      defaultVariants: {
        variant: "body1",
        color: "primary",
      },
    });

    return (
      <p ref={ref} className={typographyVariants({ variant, color, bold, truncate, wrap, center })}>
        {children}
      </p>
    );
  }
);

export default Typography;
