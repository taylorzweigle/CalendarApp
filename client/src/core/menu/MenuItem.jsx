//Taylor Zweigle, 2024
import React, { forwardRef } from "react";

import Typography from "../typography/Typography";

const MenuItem = forwardRef(({ children, rightSlot, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-row justify-between items-center bg-white dark:bg-slate-950 sm:hover:bg-slate-100 sm:hover:dark:bg-slate-800 active:bg-slate-100 active:dark:bg-slate-800 h-12 w-48 p-4 cursor-pointer"
      onClick={onClick}
    >
      <Typography variant="body1">{children}</Typography>
      {rightSlot && rightSlot}
    </div>
  );
});

export default MenuItem;
