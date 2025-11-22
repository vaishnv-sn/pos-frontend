// src/components/ui/CustomButton.jsx
import React from "react";
import clsx from "clsx";

const sizeMap = {
  sm: "py-2 px-2 text-xs",
  md: "py-5 px-3 text-sm",
  lg: "py-5 px-4 text-base",
};

const CustomButton = ({
  label,
  onClick,
  icon = null,
  disabled = false,
  className = "",
  size = "md",
  active = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",

        active
          ? "bg-[#1941B7] text-white shadow-md"
          : "bg-[#D7E0FD] text-gray-700 hover:bg-[#ADBDF9]",

        sizeMap[size],
        className
      )}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default CustomButton;
