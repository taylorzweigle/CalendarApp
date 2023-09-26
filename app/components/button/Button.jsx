"use client";

import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-300 text-slate-700 py-2 px-4 border border-slate-500 rounded-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
