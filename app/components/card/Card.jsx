"use client";

import React from "react";

const Card = ({ isOnCard, children }) => {
  return (
    <div className={`bg-white rounded-lg  p-4 shadow-md ${isOnCard ? "border border-slate-700 shadow-lg" : null}`}>
      {children}
    </div>
  );
};

export default Card;
