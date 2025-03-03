import React from "react";

const Radio = ({
  value,
  id,
  handleChange,
  name,
  selectedOption,
  width = "w-1/2",
}) => {
  return (
    <div className="grid w-full gap-4">
      <div
        className={`flex items-center ps-4 border border-gray-200 rounded  ${width}`}
      >
        <input
          id={id}
          type="radio"
          value={value}
          name={name}
          checked={selectedOption === value}
          onChange={handleChange}
          className="w-4 h-4 rounded-full"
        />
        <label
          htmlFor={id}
          className="w-full py-4 ms-2 text-sm font-medium capitalize"
        >
          {value}
        </label>
      </div>
    </div>
  );
};

export default Radio;
