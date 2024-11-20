//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

const Card = forwardRef(({ border, children }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-slate-800 ${
        border ? "border border-slate-300 dark:border-slate-600" : null
      } rounded-lg shadow-md`}
    >
      {children}
    </div>
  );
});

export default Card;
