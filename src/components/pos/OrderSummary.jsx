import React, { useState } from "react";
const OrderSummary = () => {
  const [summary, setSummary] = useState({
    totalTax: "28.045",
    totalTaxable: "280.455",
    totalDiscount: "0.000",
    adjustment: "0",
    finalTotal: "308.500",
  });

  const updateSummary = (field, value) => {
    setSummary({ ...summary, [field]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Total Tax
          </label>
          <input
            type="text"
            value={summary.totalTax}
            disabled
            className="w-24 px-2 py-1 text-sm text-gray-800 font-medium text-right bg-gray-50 border border-gray-200 rounded focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Total Taxable
          </label>
          <input
            type="text"
            value={summary.totalTaxable}
            disabled
            className="w-24 px-2 py-1 text-sm text-gray-800 font-medium text-right bg-gray-50 border border-gray-200 rounded focus:outline-none"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Total Discount
          </label>
          <input
            type="text"
            value={summary.totalDiscount}
            onChange={(e) => updateSummary("totalDiscount", e.target.value)}
            className="w-24 px-2 py-1 text-sm text-gray-800 font-medium text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Adjustment
          </label>
          <input
            type="text"
            value={summary.adjustment}
            onChange={(e) => updateSummary("adjustment", e.target.value)}
            className="w-24 px-2 py-1 text-sm text-gray-800 font-medium text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Final Total */}
      <div className="bg-yellow-200 rounded-lg px-4 py-3">
        <input
          type="text"
          value={summary.finalTotal}
          disabled
          className="w-full text-2xl font-bold text-gray-800 text-right bg-transparent border-0 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default OrderSummary;
