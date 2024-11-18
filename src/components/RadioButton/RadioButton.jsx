import { useState } from "react";
import PropTypes from "prop-types";

export default function RadioButton({ options, defaultValue, onChange }) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleChange = (value) => {
    setSelected(value); 
    onChange(value); 
  };

  return (
    <div className="flex gap-4 font-poppins">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer gap-2"
        >
          <input
            type="radio"
            name="customRadio"
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleChange(option.value)}
            className="hidden"
          />
          <span
            className={`w-4 h-4 rounded-full flex items-center justify-center border ${
              selected === option.value
                ? "bg-[#ff6b6b] border-[#ff6b6b]"
                : "border-gray-300"
            }`}
          >
            {selected === option.value && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </span>
          <span
            className={`ml-2 ${
              selected === option.value ? "text-[#ff6b6b]" : "text-white"
            }`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

RadioButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
