import React from "react";

const CheckboxField = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={id}
        className={`ms-2 text-sm font-medium ${
          disabled
            ? "text-gray-400 dark:text-gray-500"
            : "text-gray-900 dark:text-gray-300"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
