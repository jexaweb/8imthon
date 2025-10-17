// components/FormTextArea.jsx
import React from "react";

const FormTextArea = ({ label, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value} // ✅ muhim
        onChange={onChange} // ✅ muhim
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none min-h-[100px]"
      />
    </div>
  );
};

export default FormTextArea;
