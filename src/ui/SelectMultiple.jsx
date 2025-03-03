import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const SelectMultiple = ({
  name,
  value = [], // Default to an empty array
  options = [],
  onChange,
  className = "flex-col gap-2 w-full",
  placeholder = "Select options",
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState({});
  const triggerRef = useRef(null);

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    // Calculate dropdown position dynamically
    const rect = triggerRef.current.getBoundingClientRect();
    const optionHeight = 40;
    const dropdownHeight = Math.min(5, options.length) * optionHeight;
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow >= dropdownHeight) {
      setDropdownStyles({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        maxHeight: dropdownHeight,
        overflowY: "auto",
      });
    } else if (spaceAbove >= dropdownHeight) {
      setDropdownStyles({
        top: rect.top + window.scrollY - dropdownHeight,
        left: rect.left + window.scrollX,
        width: rect.width,
        maxHeight: dropdownHeight,
        overflowY: "auto",
      });
    } else {
      const limitedHeight = Math.min(spaceBelow, spaceAbove, dropdownHeight);
      setDropdownStyles({
        top:
          spaceBelow > spaceAbove
            ? rect.bottom + window.scrollY
            : rect.top + window.scrollY - limitedHeight,
        left: rect.left + window.scrollX,
        width: rect.width,
        maxHeight: limitedHeight,
        overflowY: "auto",
      });
    }

    setIsOpen(true);
  };

  const handleOptionToggle = (option) => {
    const newValues = value.includes(option)
      ? value.filter((item) => item !== option) // Remove if already selected
      : [...value, option]; // Add if not selected

    onChange(newValues); // Pass the updated array of selected values
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        !event.target.closest(".dropdown-portal")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={` ${className}`}>
      {label && (
        <label htmlFor={name} className="font-semibold ps-2 capitalize">
          {`${label}:`}
        </label>
      )}
      <div
        className="p-2 border border-gray-300 rounded shadow-sm flex justify-between items-center cursor-pointer font-normal relative text-sm"
        onClick={toggleDropdown}
        ref={triggerRef}
      >
        <div className="flex flex-wrap gap-2">
          {value.length > 0 ? (
            value.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="capitalize text-gray-700">{placeholder}</span>
          )}
        </div>
        <span className="text-gray-600">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="dropdown-portal bg-slate-100 border-2 rounded-md shadow-lg z-50"
            style={{
              position: "absolute",
              top: dropdownStyles.top,
              left: dropdownStyles.left,
              width: dropdownStyles.width,
              maxHeight: dropdownStyles.maxHeight,
              overflowY: dropdownStyles.overflowY,
            }}
          >
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleOptionToggle(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 border ${
                  value.includes(option) ? "bg-blue-200" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </motion.ul>,
          document.body
        )}
    </div>
  );
};

export default SelectMultiple;
