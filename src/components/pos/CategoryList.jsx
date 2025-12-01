import React, { useEffect, useRef } from "react";
import usePosStore from "../../store/usePosStore";
import OrderHeader from "./OrderHeader";
import CustomButton from "../ui/CustomButton";

const CategoryList = () => {
  const { selectedCategory, setSelectedCategory, categories } = usePosStore();

  const fetchCategories = usePosStore((s) => s.fetchCategories);
  const categoriesHasMore = usePosStore((s) => s.categoriesHasMore);
  const loadingCategories = usePosStore((s) => s.loadingCategories);

  const loaderRef = useRef(null);

  // Initial fetch
  useEffect(() => {
    fetchCategories(true);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        categoriesHasMore &&
        !loadingCategories
      ) {
        fetchCategories();
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [categoriesHasMore, loadingCategories, fetchCategories]);

  return (
    <div className="h-full flex flex-col">
      <OrderHeader title="Item Category" />

      <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((category) => {
            const isActive =
              selectedCategory && selectedCategory._id === category._id;

            return (
              <CustomButton
                key={category._id ?? "all-items"}
                label={category.name}
                onClick={() => setSelectedCategory(category)}
                active={isActive}
                size="md"
              />
            );
          })}
        </div>

        <div ref={loaderRef} className="h-10" />

        {loadingCategories && (
          <div className="text-center text-gray-500 py-2 text-sm">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
