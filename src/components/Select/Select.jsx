import React from "react";
import "./styles.css";

const Select = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="select-container">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="select"
        disabled={disabled}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
