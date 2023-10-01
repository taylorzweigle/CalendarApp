//Taylor Zweigle, 2023

"use client";

import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-300 text-slate-700 text-center px-4 h-12 border border-slate-500 rounded-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
