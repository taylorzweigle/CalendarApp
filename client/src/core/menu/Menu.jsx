//Taylor Zweigle, 2024
import React from "react";

const Menu = ({ open, children }) => {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } absolute bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg shadow-md pt-2 pb-2`}
    >
      {children}
    </div>
  );
};

export default Menu;
