//Taylor Zweigle, 2025
import React from "react";

import Typography from "../typography/Typography";

const Toast = ({ children, open }) => {
  return (
    <div
      className={`fixed bottom-0 md:bottom-4 left-1/2 transform -translate-x-1/2 transition-transform flex justify-between items-center bg-slate-300 dark:bg-slate-500 w-full md:w-96 pt-4 pb-4 pl-4 rounded-none md:rounded-md ${
        open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transition: "all 0.25s ease-out" }}
    >
      <Typography variant="body1" color="primary">
        {children}
      </Typography>
    </div>
  );
};

export default Toast;
