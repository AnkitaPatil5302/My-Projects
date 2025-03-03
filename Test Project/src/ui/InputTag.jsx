import React from "react";

const InputTag = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  label,
  width = "1/2",
}) => (
  <div className={`flex flex-col w-full gap-2 ps-2 py-1`}>
    {label && <label className="font-semibold">{label} :</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={` p-2 border border-gray-300 rounded font-normal text-sm w-${width}`}
    />
  </div>
);

export default InputTag;
