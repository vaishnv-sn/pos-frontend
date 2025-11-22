import React from "react";

const OrderSummary = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Tax</span>
          <span className="text-sm text-gray-800 font-medium">28.045</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Taxable</span>
          <span className="text-sm text-gray-800 font-medium">280.455</span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Discount</span>
          <span className="text-sm text-gray-800 font-medium">0.000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Adjustment</span>
          <span className="text-sm text-gray-800 font-medium">0</span>
        </div>
      </div>

      {/* Final Total */}
      <div className="bg-yellow-200 rounded-lg px-4 py-3 text-right">
        <span className="text-2xl font-bold text-gray-800">308.500</span>
      </div>
    </div>
  );
};

export default OrderSummary;
