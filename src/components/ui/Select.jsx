// Select.jsx
import { ChevronDown } from "lucide-react";

const Select = ({
  placeholder,
  value,
  onChange,
  options = [],
  disabled = false,
}) => (
  <div className="relative">
    <select
      disabled={disabled}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 appearance-none bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
    >
      <option value="">{placeholder || "Select..."}</option>
      {options.map((opt) => (
        <option key={opt?.value} value={opt?.value}>
          {opt?.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
  </div>
);

export default Select;
