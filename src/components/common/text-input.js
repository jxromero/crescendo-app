import React from "react";

const TextInput = ({ name, label, type, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control"
        type={type}
      />
    </div>
  );
};

export default TextInput;
