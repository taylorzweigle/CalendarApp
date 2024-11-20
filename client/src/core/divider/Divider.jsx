//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

const Divider = forwardRef(({ ...props }, ref) => {
  return <div ref={ref} className="h-0 w-full border-b border-slate-300 dark:border-slate-600" />;
});

export default Divider;
