import React from "react";

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
  <>
    <input
      id={name}
      type={type}
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={name}>{name}</label>
  </>
);

export default Checkbox;
