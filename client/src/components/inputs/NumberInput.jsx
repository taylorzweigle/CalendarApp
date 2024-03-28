//Taylor Zweigle, 2024
import React from "react";

import TextInput from "../../core/textInput/TextInput";

const NumberInput = ({ label, value, onChange }) => {
  return <TextInput id={label} value={value} type="text" pattern="[0-9]*" inputMode="numeric" onChange={onChange} />;
};

export default NumberInput;
