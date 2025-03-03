import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const SelectTag = ({
  name,
  value,
  options,
  onChange,
  className = "flex-col gap-2 w-full",
  placeholder = "Select an option",
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
    const optionHeight = 40; // Approximate height of each option
    const dropdownHeight = Math.min(5, options.length) * optionHeight; // Maximum 5 options
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

  const handleOptionSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
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
        <span className="capitalize text-gray-700">{value || placeholder}</span>
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
              overflowY: "auto",
            }}
          >
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 border ${
                  value === option ? "bg-blue-200" : ""
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

export default SelectTag;
