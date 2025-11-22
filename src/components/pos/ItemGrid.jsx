import React, { useState } from "react";
import OrderHeader from "./OrderHeader";

// ITEM CARD COMPONENT
const ItemCard = ({ item, onAddToCart }) => {
  return (
    <div
      className="bg-linear-to-br from-yellow-100 to-yellow-200 rounded-lg p-3 shadow-sm hover:shadow-md hover:from-yellow-200 hover:to-yellow-300 transition-all cursor-pointer relative h-40 flex flex-col"
      onClick={() => onAddToCart(item)}
    >
      {/* Price Badge */}
      <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-green-500 text-white text-xs font-bold">
        {item.price}
      </div>

      {/* Cart Icon */}
      <div className="flex justify-center items-center flex-1 mt-4">
        <div className="text-4xl text-yellow-700">🛒</div>
      </div>

      {/* Item Name */}
      <h3 className="text-center text-sm font-semibold text-gray-800 mb-2 line-clamp-2 px-1">
        {item.name}
      </h3>

      {/* Stock Badge - Only shows when low stock */}
      {item.stock === "low" && (
        <div className="flex items-center justify-center gap-1 bg-red-500 text-white text-xs py-1.5 rounded-b-md font-medium -mx-3 -mb-3">
          <span>⚠</span>
          <span>Low Stock</span>
        </div>
      )}
    </div>
  );
};

// MAIN ITEM GRID COMPONENT
const ItemGrid = ({ selectedCategory = "All Items" }) => {
  const [items] = useState([
    {
      id: 1,
      name: "DAVIDOFF ONE SLIM",
      price: "24.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 2,
      name: "MARLBORO SILVER BLUE",
      price: "23.500",
      stock: "low",
      category: "SMOKING",
    },
    {
      id: 3,
      name: "MARLBORO VISTA",
      price: "23.500",
      stock: "low",
      category: "SMOKING",
    },
    {
      id: 4,
      name: "MARLBORO TOUCH",
      price: "19.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 5,
      name: "SCISSORS RED SMALL",
      price: "12.700",
      stock: "normal",
      category: "OTHER",
    },
    {
      id: 6,
      name: "WILLS RED SMALL",
      price: "13.700",
      stock: "low",
      category: "SMOKING",
    },
    {
      id: 7,
      name: "DAVIDOFF GOLD",
      price: "24.500",
      stock: "low",
      category: "SMOKING",
    },
    {
      id: 8,
      name: "MARLBORO WHITE",
      price: "23.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 9,
      name: "MARLBORO RED",
      price: "23.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 10,
      name: "MARLBORO GOLD",
      price: "23.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 11,
      name: "DAVIDOFF ONE",
      price: "23.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 12,
      name: "DUNHILL GOLD",
      price: "16.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 13,
      name: "WINSTON HI",
      price: "15.700",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 14,
      name: "BENSON&HEDGES",
      price: "17.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 15,
      name: "WINSTON RED",
      price: "17.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 16,
      name: "WINSTON SILVER",
      price: "17.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 17,
      name: "WINSTON BLUE",
      price: "17.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 18,
      name: "MONTI CARLO BLUE",
      price: "13.700",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 19,
      name: "WILLS GOLD SMALL",
      price: "13.700",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 20,
      name: "PALL MALL DOUBLE CLICK",
      price: "15.700",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 21,
      name: "MONTI CARLO SILVER",
      price: "13.700",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 22,
      name: "DAVIDOFF EVOLVE WHITE",
      price: "16.500",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 23,
      name: "WEST RED",
      price: "14.700",
      stock: "normal",
      category: "SMOKING",
    },
    {
      id: 24,
      name: "LUCKY STRIKE",
      price: "16.500",
      stock: "normal",
      category: "SMOKING",
    },
  ]);

  const handleAddToCart = (item) => {
    console.log("Add to cart:", item);
    // Add your cart logic here
  };

  const filteredItems =
    selectedCategory === "All Items"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <OrderHeader title="Item Details" />

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="grid grid-cols-4 gap-3">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemGrid;
