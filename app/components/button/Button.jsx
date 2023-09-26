"use client";

import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button className="bg-transparent hover:bg-blue-100 text-stone-700 py-2 px-4 rounded-full" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
