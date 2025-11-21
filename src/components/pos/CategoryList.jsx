import React, { useState } from "react";

import OrderHeader from "./OrderHeader";

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  const categories = [
    { id: 1, name: "All Items", color: "blue" },
    { id: 2, name: "OIL", color: "gray" },
    { id: 3, name: "CHOCLATE", color: "gray" },
    { id: 4, name: "SPICES", color: "gray" },
    { id: 5, name: "FOIL&PLASTIC", color: "gray" },
    { id: 6, name: "RICE&FOOD", color: "gray" },
    { id: 7, name: "SMOKING", color: "gray" },
    { id: 8, name: "MILK", color: "gray" },
    { id: 9, name: "SOFT DRINKS", color: "gray" },
    { id: 10, name: "FROZEN&FRESH", color: "gray" },
    { id: 11, name: "TEA&COFFEE", color: "gray" },
    { id: 12, name: "OTHER", color: "gray" },
    { id: 13, name: "SEEDS&DRY FRUITS", color: "gray" },
    { id: 14, name: "MEDICAL", color: "gray" },
  ];
  return (
    <>
      <div className="h-full">
        <OrderHeader title="Item Category" />
        <div className="grid grid-cols-2 gap-3 overflow-auto p-2 h-[calc(100%-60px)]">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`
              py-4 px-3 rounded-lg font-medium text-sm transition-all
              ${
                selectedCategory === category.name
                  ? "bg-[#1941B7] text-white shadow-md"
                  : "bg-[#D7E0FD] text-gray-700 hover:bg-[#ADBDF9]"
              }
            `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
