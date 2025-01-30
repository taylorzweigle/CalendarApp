//Taylor Zweigle, 2024
import React from "react";

import TextInput from "../../core/textInput/TextInput";

const NumberInput = ({ label, value, showLabel, maxLength, onChange }) => {
  return (
    <TextInput
      id={label}
      label={label}
      value={value}
      showLabel={showLabel}
      type="text"
      pattern="[0-9]*"
      inputMode="numeric"
      maxLength={maxLength}
      onChange={onChange}
    />
  );
};

export default NumberInput;
