//Taylor Zweigle, 2023
"use client";

import React from "react";

const Card = ({ isOnCard, children }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${isOnCard ? "border border-slate-700 shadow-lg" : null}`}>{children}</div>
  );
};

export default Card;
