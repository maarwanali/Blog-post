import React from "react";

function Checkbox({ name, checked, onChange }) {
  console.log(checked);
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        value={name}
        checked={checked.includes(name)}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-[#e53935]"
      />
      <span className="text-gray-700">{name}</span>
    </label>
  );
}

export default Checkbox;
