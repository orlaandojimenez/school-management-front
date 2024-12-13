import React from "react";
import "./styles.css";

const Select = ({ name, value, onChange, options, placeholder }) => {
  return (
    <div className="select-container">
      <select name={name} value={value} onChange={onChange} className="select">
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
