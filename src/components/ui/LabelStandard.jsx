const Label = ({ children, required }) => (
  <label className="block text-sm text-gray-700 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export default Label;
