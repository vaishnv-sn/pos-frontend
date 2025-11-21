import React from "react";

const OrderHeader = ({ title = "Header" }) => {
  return (
    <div className="w-full bg-[#1950AF] text-white py-2 px-1  shadow flex items-center justify-center relative">
      <h1 className="text-lg font-semibold tracking-wide">{title}</h1>
    </div>
  );
};

export default OrderHeader;
