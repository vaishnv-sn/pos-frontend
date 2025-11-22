import React, { useState } from "react";

const OrderTable = () => {
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "MARLBORO VISTA",
      qty: 9,
      price: 23.5,
      unit: "Box",
      amount: 211.5,
      checked: true,
    },
    {
      id: 2,
      name: "MARLBORO SILVER BLUE",
      qty: 1,
      price: 23.5,
      unit: "Box",
      amount: 23.5,
      checked: false,
    },
    {
      id: 3,
      name: "DAVIDOFF ONE SLIM",
      qty: 3,
      price: 24.5,
      unit: "Box",
      amount: 73.5,
      checked: false,
    },
  ]);

  const toggleCheck = (id) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateItem = (id, field, value) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 bg-blue-600 text-white text-xs font-semibold">
        <div className="col-span-1 px-2 py-2 text-center">#</div>
        <div className="col-span-4 px-2 py-2">ITEM NAME</div>
        <div className="col-span-1 px-2 py-2 text-center">QTY</div>
        <div className="col-span-2 px-2 py-2 text-right">PRICE</div>
        <div className="col-span-2 px-2 py-2 text-center">UNIT</div>
        <div className="col-span-2 px-2 py-2 text-right">AMOUNT</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 hover:bg-gray-50 text-sm"
          >
            <div className="col-span-1 px-2 py-2 flex items-center justify-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
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
                onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                className="w-full px-2 py-1 text-center text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2 px-2 py-2">
              <input
                type="number"
                value={item.price}
                onChange={(e) => updateItem(item.id, "price", e.target.value)}
                className="w-full px-2 py-1 text-right text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2 px-2 py-2">
              <select
                value={item.unit}
                onChange={(e) => updateItem(item.id, "unit", e.target.value)}
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
                value={item.amount}
                disabled
                className="w-full px-2 py-1 text-right text-sm text-gray-800 font-medium bg-gray-50 border border-gray-200 rounded focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Row Button */}
      <button className="w-full px-4 py-2 text-left text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
        + Add Row
      </button>

      {/* Total Row */}
      <div className="grid grid-cols-12 bg-blue-600 text-white text-sm font-semibold">
        <div className="col-span-6 px-4 py-2">TOTAL QTY</div>
        <div className="col-span-1 px-2 py-2">
          <input
            type="text"
            value="13"
            disabled
            className="w-full px-2 py-1 text-center text-sm bg-blue-600 text-white border-0 focus:outline-none font-semibold"
          />
        </div>
        <div className="col-span-3 px-4 py-2 text-right">TOTAL AMOUNT</div>
        <div className="col-span-2 px-2 py-2">
          <input
            type="text"
            value="308.500"
            disabled
            className="w-full px-2 py-1 text-right text-sm bg-blue-600 text-white border-0 focus:outline-none font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
