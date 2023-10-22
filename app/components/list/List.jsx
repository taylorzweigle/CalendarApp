//Taylor Zweigle, 2023
"use client";

import React from "react";

import Typography from "../typography/Typography";

const List = ({ label, value }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <Typography variant="body2" color="text-slate-500 dark:text-slate-400">
        {label}
      </Typography>
      <Typography variant="subheading">{value}</Typography>
    </div>
  );
};

export default List;
