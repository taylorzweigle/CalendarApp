//Taylor Zweigle, 2023
"use client";

import React from "react";

import Typography from "../typography/Typography";

const Button = ({ prefix, onClick, children }) => {
  return (
    <button className="bg-slate-100 hover:bg-slate-300 border border-slate-500 rounded-lg px-4 h-12" onClick={onClick}>
      <div className="flex flex-row gap-1 justify-center items-center">
        {prefix ? <span className="text-slate-700">{prefix}</span> : null}
        {children ? (
          <Typography variant="body1" color="text-slate-700">
            {children}
          </Typography>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
