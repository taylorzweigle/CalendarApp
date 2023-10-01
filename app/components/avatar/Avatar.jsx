//Taylor Zweigle, 2023

"use client";

import React from "react";

const Avatar = ({ user }) => {
  return <div className="flex justify-center items-center bg-slate-200 w-12 h-12 rounded-full text-lg">{user}</div>;
};

export default Avatar;
