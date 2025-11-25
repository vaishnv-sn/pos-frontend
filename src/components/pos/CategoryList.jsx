import React, { useEffect } from "react";
import usePosStore from "../../store/usePosStore";
import OrderHeader from "./OrderHeader";
import CustomButton from "../ui/CustomButton";

const CategoryList = () => {
  const { selectedCategory, setSelectedCategory, categories, fetchCategories } =
    usePosStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <OrderHeader title="Item Category" />

      {/* Scrollable category list */}
      <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const isActive =
              selectedCategory && selectedCategory._id === category._id;

            return (
              <CustomButton
                key={category.name}
                label={category.name}
                onClick={() => setSelectedCategory(category)}
                active={isActive}
                size="md"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
