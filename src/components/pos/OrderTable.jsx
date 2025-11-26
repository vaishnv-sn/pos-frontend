import React from "react";
import usePosStore from "../../store/usePosStore";

const OrderTable = () => {
  const {
    orderItems,
    updateItemQty,
    updateItemPrice,
    updateItemUnit,
    toggleItemCheck,
    units, // <-- from meta slice
  } = usePosStore();

  const totalQty = orderItems.reduce((sum, item) => sum + Number(item.qty), 0);
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="grid grid-cols-12 bg-blue-600 text-white text-xs font-semibold shrink-0">
        <div className="col-span-1 px-2 py-2 text-center">#</div>
        <div className="col-span-4 px-2 py-2">ITEM NAME</div>
        <div className="col-span-1 px-2 py-2 text-center">QTY</div>
        <div className="col-span-2 px-2 py-2 text-right">PRICE</div>
        <div className="col-span-2 px-2 py-2 text-center">UNIT</div>
        <div className="col-span-2 px-2 py-2 text-right">AMOUNT</div>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
        {orderItems.map((item, index) => {
          const ID = item._id; // correct key
          const retailRate = Number(item.retailRate) || 0;

          return (
            <div
              key={ID}
              className="grid grid-cols-12 hover:bg-gray-50 text-sm"
            >
              {/* Checkbox */}
              <div className="col-span-1 px-2 py-2 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItemCheck(ID)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              {/* Name */}
              <div className="col-span-4 px-2 py-2">
                <input
                  value={item.name}
                  disabled
                  className="w-full px-2 py-1 bg-transparent border-0 text-gray-800"
                />
              </div>

              {/* Qty */}
              <div className="col-span-1 px-2 py-2">
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateItemQty(ID, e.target.value)}
                  className="w-full px-2 py-1 text-center border border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              {/* Price */}
              <div className="col-span-2 px-2 py-2">
                <input
                  type="number"
                  value={retailRate}
                  onChange={(e) => updateItemPrice(ID, e.target.value)}
                  className="w-full px-2 py-1 text-right border border-gray-300 rounded focus:ring-blue-500"
                />
              </div>

              {/* Unit */}
              <div className="col-span-2 px-2 py-2">
                <select
                  value={item.unit}
                  onChange={(e) => updateItemUnit(ID, e.target.value)}
                  className="w-full px-1 py-1 border border-gray-300 rounded text-xs bg-white"
                >
                  {units.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div className="col-span-2 px-2 py-2">
                <input
                  disabled
                  value={Number(item.amount).toFixed(2)}
                  className="w-full px-2 py-1 text-right bg-gray-50 border border-gray-200 rounded"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Add Row */}
      <button className="w-full px-4 py-2 text-left text-blue-600 text-sm hover:bg-blue-50 border-t border-gray-200">
        + Add Row
      </button>

      {/* Total */}
      <div className="grid grid-cols-12 bg-blue-600 text-white text-sm font-semibold shrink-0">
        <div className="col-span-6 px-4 py-2">TOTAL QTY</div>
        <div className="col-span-1 px-2 py-2 text-center">{totalQty}</div>
        <div className="col-span-3 px-4 py-2 text-right">TOTAL AMOUNT</div>
        <div className="col-span-2 px-2 py-2 text-right">
          {totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
