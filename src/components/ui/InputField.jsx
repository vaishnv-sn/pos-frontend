const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
  disabled = false,
}) => (
  <input
    type={type}
    disabled={disabled}
    className={`w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-50 ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default Input;
