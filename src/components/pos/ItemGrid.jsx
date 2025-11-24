import React, { useEffect } from "react";
import usePosStore from "../../store/usePosStore";
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
        {Number(item.price).toFixed(3)}
      </div>

      {/* Cart Icon */}
      <div className="flex justify-center items-center flex-1 mt-4">
        <div className="text-4xl text-yellow-700">🛒</div>
      </div>

      {/* Item Name */}
      <h3 className="text-center text-sm font-semibold text-gray-800 mb-2 line-clamp-2 px-1">
        {item.name}
      </h3>

      {/* Stock Badge */}
      {item.stock === "low" && (
        <div className="flex items-center justify-center gap-1 bg-red-500 text-white text-xs py-1.5 rounded-b-md font-medium -mx-3 -mb-3">
          ⚠ Low Stock
        </div>
      )}
    </div>
  );
};

// MAIN ITEM GRID COMPONENT
const ItemGrid = () => {
  const { selectedCategory, items, fetchItems, addItem } = usePosStore();

  /** Fetch items once on page load */
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  /** Filter items from Zustand */
  const filteredItems =
    selectedCategory === "All Items"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="h-full flex flex-col">
      <OrderHeader title="Item Details" />

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="grid grid-cols-4 gap-3">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onAddToCart={addItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemGrid;
