//Taylor Zweigle, 2023
"use client";

import React from "react";
import Typography from "../typography/Typography";

const Avatar = ({ user }) => {
  return (
    <div className="flex justify-center items-center bg-slate-200 w-12 h-12 rounded-full">
      <Typography variant="heading">{user}</Typography>
    </div>
  );
};

export default Avatar;
