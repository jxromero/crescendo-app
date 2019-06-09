import React from "react";

const NumberInput = ({ name, label, type, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        className={`form-control`}
        type={`number`}
        min={`0`}
      />
    </div>
  );
};

export default NumberInput;
