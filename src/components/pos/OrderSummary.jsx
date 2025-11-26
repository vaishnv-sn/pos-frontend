import React from "react";
import usePosStore from "../../store/usePosStore";

const OrderSummary = () => {
  const {
    orderItems,
    discountAmount,
    discountType,
    adjustment,
    setDiscountAmount,
    setDiscountType,
    setAdjustment,
  } = usePosStore();

  let totalTax = 0;
  let totalTaxable = 0;
  let totalAmount = 0;

  // ----- ITEM-WISE TAX CALCULATION -----
  orderItems.forEach((item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.retailRate) || 0;
    const rate = Number(item.taxRate) || 0; // numeric percent, ex: 10
    // Default to true if not specified (most common case)
    const includeTax = item.retailRateIncludeTax ?? true;

    let taxable = 0;
    let tax = 0;

    if (includeTax) {
      // Price includes tax
      taxable = (price * qty) / (1 + rate / 100);
      tax = price * qty - taxable;
    } else {
      // Price excludes tax
      taxable = price * qty;
      tax = taxable * (rate / 100);
    }

    totalTaxable += taxable;
    totalTax += tax;
    totalAmount += taxable + tax;
  });

  // ----- DISCOUNT -----
  let discount = 0;
  if (discountType === "PERCENT") {
    discount = (totalAmount * Number(discountAmount || 0)) / 100;
  } else {
    discount = Number(discountAmount) || 0;
  }

  // ----- FINAL TOTAL -----
  const finalTotal = totalAmount - discount + Number(adjustment || 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600">Total Tax</label>
          <input
            value={totalTax.toFixed(2)}
            disabled
            className="w-24 px-2 py-1 bg-gray-50 text-right border rounded text-sm"
          />
        </div>

        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600">Taxable Amount</label>
          <input
            value={totalTaxable.toFixed(2)}
            disabled
            className="w-24 px-2 py-1 bg-gray-50 text-right border rounded text-sm"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600">Discount</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              placeholder="0"
              className="w-20 px-2 py-1 text-right border rounded text-sm"
            />
            <select
              className="px-2 py-1 border rounded text-sm"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="PERCENT">%</option>
              <option value="FIXED">₹</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <label className="text-sm text-gray-600">Adjustment</label>
          <input
            type="number"
            value={adjustment}
            onChange={(e) => setAdjustment(e.target.value)}
            placeholder="0"
            className="w-24 px-2 py-1 text-right border rounded text-sm"
          />
        </div>
      </div>

      {/* Final Total */}
      <div className="bg-yellow-200 rounded-lg px-4 py-3">
        <div className="text-right">
          <div className="text-xs text-gray-600 mb-1">Total Amount</div>
          <div className="text-2xl font-bold">₹{finalTotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
