"use client";

import React from "react";

const Select = ({ title, options, value, onChange }) => {
  return (
    <select name={title} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
