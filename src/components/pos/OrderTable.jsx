import React from "react";
import usePosStore from "../../store/usePosStore";

const OrderTable = () => {
  const {
    orderItems,
    updateItemQty,
    updateItemPrice,
    updateItemUnit,
    toggleItemCheck,
  } = usePosStore();

  const totalQty = orderItems.reduce((sum, item) => sum + Number(item.qty), 0);
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 bg-blue-600 text-white text-xs font-semibold shrink-0">
        <div className="col-span-1 px-2 py-2 text-center">#</div>
        <div className="col-span-4 px-2 py-2">ITEM NAME</div>
        <div className="col-span-1 px-2 py-2 text-center">QTY</div>
        <div className="col-span-2 px-2 py-2 text-right">PRICE</div>
        <div className="col-span-2 px-2 py-2 text-center">UNIT</div>
        <div className="col-span-2 px-2 py-2 text-right">AMOUNT</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
        {orderItems.map((item, index) => (
          <div
            key={item.id || index}
            className="grid grid-cols-12 hover:bg-gray-50 text-sm"
          >
            <div className="col-span-1 px-2 py-2 flex items-center justify-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItemCheck(item.id)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="col-span-4 px-2 py-2">
              <input
                type="text"
                value={item.name}
                disabled
                className="w-full px-2 py-1 text-sm text-gray-800 bg-transparent border-0 focus:outline-none"
              />
            </div>
            <div className="col-span-1 px-2 py-2">
              <input
                type="number"
                value={item.qty}
                onChange={(e) => updateItemQty(item.id, e.target.value)}
                className="w-full px-2 py-1 text-center text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2 px-2 py-2">
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateItemPrice(item.id, e.target.value)}
                className="w-full px-2 py-1 text-right text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2 px-2 py-2">
              <select
                value={item.unit}
                onChange={(e) => updateItemUnit(item.id, e.target.value)}
                className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option>Box</option>
                <option>Piece</option>
                <option>Carton</option>
              </select>
            </div>
            <div className="col-span-2 px-2 py-2">
              <input
                type="number"
                value={Number(item.amount).toFixed(3)}
                disabled
                className="w-full px-2 py-1 text-right text-sm text-gray-800 font-medium bg-gray-50 border border-gray-200 rounded focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Row Button */}
      <button className="w-full px-4 py-2 text-left text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors shrink-0 border-t border-gray-200">
        + Add Row
      </button>

      {/* Total Row */}
      <div className="grid grid-cols-12 bg-blue-600 text-white text-sm font-semibold shrink-0">
        <div className="col-span-6 px-4 py-2">TOTAL QTY</div>
        <div className="col-span-1 px-2 py-2">
          <input
            type="text"
            value={totalQty}
            disabled
            className="w-full px-2 py-1 text-center text-sm bg-blue-600 text-white border-0 focus:outline-none font-semibold"
          />
        </div>
        <div className="col-span-3 px-4 py-2 text-right">TOTAL AMOUNT</div>
        <div className="col-span-2 px-2 py-2">
          <input
            type="text"
            value={totalAmount.toFixed(3)}
            disabled
            className="w-full px-2 py-1 text-right text-sm bg-blue-600 text-white border-0 focus:outline-none font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
