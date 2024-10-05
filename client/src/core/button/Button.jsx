//Taylor Zweigle, 2024
import React from "react";
import { cva } from "class-variance-authority";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import Typography from "../typography/Typography";

const Button = ({ variant, fullWidth, prefix, loading, onClick, children }) => {
  const buttonVariants = cva("rounded-lg px-4 h-12", {
    variants: {
      variant: {
        default: [
          "bg-slate-200 dark:bg-slate-700",
          "sm:hover:bg-slate-300 sm:dark:hover:bg-slate-600",
          "active:bg-slate-300 active:dark:bg-slate-600",
          "border border-slate-500 dark:border-slate-500",
        ],
        primary: [
          "bg-sky-500 dark:bg-sky-700",
          "sm:hover:bg-sky-600 sm:dark:hover:bg-sky-600",
          "active:bg-sky-600 active:dark:bg-sky-600",
          "border border-sky-800 dark:border-sky-500",
        ],
        error: [
          "bg-rose-500 dark:bg-rose-700",
          "sm:hover:bg-rose-600 sm:dark:hover:bg-rose-600",
          "active:bg-rose-600 active:dark:bg-rose-600",
          "border border-rose-800 dark:border-rose-500",
        ],
        text: [
          "bg-transparent dark:bg-transparent",
          "sm:hover:bg-slate-200 sm:dark:hover:bg-slate-700",
          "active:bg-slate-200 active:dark:bg-slate-700",
        ],
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      fullWidth: false,
    },
  });

  return (
    <button className={buttonVariants({ variant, fullWidth })} onClick={onClick}>
      <div className="flex flex-row gap-1 justify-center items-center">
        {prefix ? <span className="text-slate-700 dark:text-white">{prefix}</span> : null}
        {loading && <DataUsageIcon className="text-slate-700 dark:text-white animate-spin" />}
        {!loading && children ? (
          <Typography
            variant="body1"
            color={variant === "primary" || variant === "error" ? "base" : "primary"}
          >
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
