"use client";

import React from "react";

const Select = ({ title, options, selected }) => {
  return (
    <select name={title}>
      {options.map((option) => (
        <option key={option} value={option} selected={selected === option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
