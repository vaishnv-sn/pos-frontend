import React from "react";
import usePosStore from "../../store/usePosStore";

const OrderSummary = () => {
  const { orderItems, discount, adjustment, setDiscount, setAdjustment } =
    usePosStore();

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
  const taxRate = 0.1; // 10% tax
  // Assuming totalAmount is inclusive of tax or exclusive?
  // The mock data showed Total Amount 308.500, Tax 28.045, Taxable 280.455.
  // 280.455 + 28.045 = 308.5.
  // So Taxable = Total / (1 + rate)
  // Tax = Total - Taxable

  // Or if prices are exclusive:
  // Taxable = Total Amount from items (if items are exclusive)
  // But usually POS shows price per unit which might be inclusive or exclusive.
  // Let's assume prices are inclusive for now based on the mock.

  const taxableAmount = totalAmount / (1 + taxRate);
  const taxAmount = totalAmount - taxableAmount;

  const finalTotal = totalAmount - Number(discount) + Number(adjustment);

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
            value={taxAmount.toFixed(3)}
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
            value={taxableAmount.toFixed(3)}
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
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-24 px-2 py-1 text-sm text-gray-800 font-medium text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Adjustment
          </label>
          <input
            type="number"
            value={adjustment}
            onChange={(e) => setAdjustment(e.target.value)}
            className="w-24 px-2 py-1 text-sm text-gray-800 font-medium text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Final Total */}
      <div className="bg-yellow-200 rounded-lg px-4 py-3">
        <input
          type="text"
          value={finalTotal.toFixed(3)}
          disabled
          className="w-full text-2xl font-bold text-gray-800 text-right bg-transparent border-0 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default OrderSummary;
