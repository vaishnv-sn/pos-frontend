// TaxToggle.jsx
const TaxToggle = ({ name, defaultInclude = true, onChange }) => {
  const handleChange = (isInclude) => {
    onChange?.(isInclude);
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={defaultInclude}
          onChange={() => handleChange(true)}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2 text-sm text-gray-600">Include Tax</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={!defaultInclude}
          onChange={() => handleChange(false)}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2 text-sm text-gray-600">Exclude Tax</span>
      </label>
    </div>
  );
};

export default TaxToggle;
