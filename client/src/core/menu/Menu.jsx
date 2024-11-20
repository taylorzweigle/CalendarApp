//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

const Menu = forwardRef(({ open, children }, ref) => {
  return (
    <div
      ref={ref}
      className={`${
        open ? "block" : "hidden"
      } absolute bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg shadow-md pt-2 pb-2 z-50`}
    >
      {children}
    </div>
  );
});

export default Menu;
