import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import usePosStore from "../../store/usePosStore";

const MaterialSelect = ({
  placeholder,
  value,
  onChange,
  disabled = false,
}) => {
  const {
    items,
    itemsHasMore,
    loadingItems,
    fetchItems,
    searchItems,
  } = usePosStore();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const observerTarget = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Create options from items (materials)
  const options = items.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter locally for instant feedback
  const filteredOptions = searchTerm
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Infinite scroll observer callback
  const lastItemElementRef = useCallback(
    (node) => {
      if (loadingItems) return;
      if (observerTarget.current) observerTarget.current.disconnect();

      observerTarget.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && itemsHasMore && !searchTerm) {
          fetchItems();
        }
      });

      if (node) observerTarget.current.observe(node);
    },
    [loadingItems, itemsHasMore, fetchItems, searchTerm]
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
        searchItems(term);
      } else {
        // Reset to initial state when search is cleared
        fetchItems(true);
      }
    }, 300);
  };

  const handleOpen = () => {
    setIsOpen(true);
    // Load initial items if not loaded
    if (items.length === 0) {
      fetchItems(true);
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
            : placeholder || "Select item"}
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
                placeholder="Search item..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Options List - Scrollable */}
            <div className="flex-1 overflow-auto py-1">
              {filteredOptions.length === 0 && !loadingItems ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No items found
                </div>
              ) : (
                filteredOptions.map((opt, index) => {
                  const isLast = index === filteredOptions.length - 1;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      ref={isLast ? lastItemElementRef : null}
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
              {loadingItems && (
                <div className="px-4 py-3 flex items-center justify-center">
                  <Loader2 size={18} className="animate-spin text-blue-600" />
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              )}

              {/* No More Data */}
              {!itemsHasMore &&
                items.length > 0 &&
                !loadingItems &&
                !searchTerm && (
                  <div className="px-4 py-2 text-center text-xs text-gray-400">
                    All items loaded
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialSelect;
