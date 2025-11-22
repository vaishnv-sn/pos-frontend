import React from "react";

import OrderHeader from "./OrderHeader";
import { CATEGORIES } from "../../constants/categories";
import CustomButton from "../ui/CustomButton";

const CategoryList = ({ selected, onSelect }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <OrderHeader title="Item Category" />

      {/* Scrollable category list */}
      <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((name) => {
            const isActive = selected === name;

            return (
              <CustomButton
                key={name}
                label={name}
                onClick={() => onSelect(name)}
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
