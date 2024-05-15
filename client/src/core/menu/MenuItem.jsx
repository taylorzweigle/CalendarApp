//Taylor Zweigle, 2024
import React from "react";

import Typography from "../typography/Typography";

const MenuItem = ({ children, onClick }) => {
  return (
    <div
      className="flex flex-row items-center bg-white dark:bg-slate-950 hover:bg-slate-100 hover:dark:bg-slate-800 h-12 w-48 p-4 cursor-pointer"
      onClick={onClick}
    >
      <Typography variant="body1">{children}</Typography>
    </div>
  );
};

export default MenuItem;
