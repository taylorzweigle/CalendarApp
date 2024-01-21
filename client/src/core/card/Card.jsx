//Taylor Zweigle, 2024
import React from "react";

const Card = ({ border, children }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 ${
        border ? "border border-slate-300 dark:border-slate-600" : null
      } rounded-lg shadow-md`}
    >
      {children}
    </div>
  );
};

export default Card;
