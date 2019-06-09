import React from "react";

const DynaInput = ({ name, label, onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {value &&
        value.map((v, k) => (
          <input
            onChange={onChange}
            name={name || ""}
            id={name || ""}
            className="form-control mb-1"
            type={`text`}
            key={k}
            data-index={k}
            value={v.name || v.instructions || ""}
          />
        ))}
      <div>
        <p onClick={onChange} data-func={name} className="btn btn-info">
          Add {name}
        </p>
      </div>
    </div>
  );
};

export default DynaInput;
