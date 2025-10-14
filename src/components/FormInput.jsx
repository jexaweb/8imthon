// src/components/FormInput.jsx
import React from "react";

export const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  icon: Icon,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          className={`w-full pl-${
            Icon ? "10" : "3"
          } pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none`}
        />
      </div>
    </div>
  );
};
