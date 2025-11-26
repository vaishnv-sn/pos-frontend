import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, Plus, Loader2 } from "lucide-react";
import usePosStore from "../../store/usePosStore";

const CategorySelect = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  onAddNew,
}) => {
  const {
    categories,
    categoriesHasMore,
    loadingCategories,
    fetchCategories,
    searchCategories,
  } = usePosStore();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const observerTarget = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Create options from categories
  const options = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter locally for instant feedback
  const filteredOptions = searchTerm
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Infinite scroll observer callback
  const lastCategoryElementRef = useCallback(
    (node) => {
      if (loadingCategories) return;
      if (observerTarget.current) observerTarget.current.disconnect();

      observerTarget.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && categoriesHasMore && !searchTerm) {
          fetchCategories();
        }
      });

      if (node) observerTarget.current.observe(node);
    },
    [loadingCategories, categoriesHasMore, fetchCategories, searchTerm]
  );

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search - only search on server after 300ms of no typing
    searchTimeoutRef.current = setTimeout(() => {
      if (term.trim()) {
        searchCategories(term);
      } else {
        // Reset to initial state when search is cleared
        fetchCategories(true);
      }
    }, 300);
  };

  const handleOpen = () => {
    setIsOpen(true);
    // Load initial categories if not loaded
    if (categories.length === 0) {
      fetchCategories(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Selected Value Display */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 text-left flex items-center justify-between"
      >
        <span className={selectedOption ? "text-gray-700" : "text-gray-400"}>
          {selectedOption
            ? selectedOption.label
            : placeholder || "Select category"}
        </span>
        <ChevronDown className="text-gray-400 w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={handleClose} />

          {/* Options */}
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 flex flex-col overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b bg-white">
              <input
                type="text"
                placeholder="Search category..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Add New Category Button */}
            {onAddNew && (
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onAddNew();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 border-b font-medium bg-white"
              >
                <Plus size={16} className="text-blue-600" />
                Add new category
              </button>
            )}

            {/* Options List - Scrollable */}
            <div className="flex-1 overflow-auto py-1">
              {filteredOptions.length === 0 && !loadingCategories ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No categories found
                </div>
              ) : (
                filteredOptions.map((opt, index) => {
                  const isLast = index === filteredOptions.length - 1;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      ref={isLast ? lastCategoryElementRef : null}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                        value === opt.value
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })
              )}

              {/* Loading Indicator */}
              {loadingCategories && (
                <div className="px-4 py-3 flex items-center justify-center">
                  <Loader2 size={18} className="animate-spin text-blue-600" />
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              )}

              {/* No More Data */}
              {!categoriesHasMore &&
                categories.length > 0 &&
                !loadingCategories &&
                !searchTerm && (
                  <div className="px-4 py-2 text-center text-xs text-gray-400">
                    All categories loaded
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelect;
