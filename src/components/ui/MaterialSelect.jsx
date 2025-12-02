import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import instance from "../../lib/axios";

const MaterialSelect = ({ placeholder, value, onChange, disabled = false }) => {
  const [dropdownItems, setDropdownItems] = useState([]);
  const [dropdownPage, setDropdownPage] = useState(1);
  const [dropdownHasMore, setDropdownHasMore] = useState(true);
  const [loadingDropdown, setLoadingDropdown] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const observerRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const fetchDropdown = useCallback(
    async (reset = false) => {
      if (loadingDropdown || (!reset && !dropdownHasMore)) return;

      const page = reset ? 1 : dropdownPage;

      setLoadingDropdown(true);
      try {
        const res = await instance.get(`/material?page=${page}&limit=20`);
        const data = res.data.data;
        const totalPages = res.data.pagination.totalPages;

        setDropdownItems((prev) => (reset ? data : [...prev, ...data]));
        setDropdownPage(page + 1);
        setDropdownHasMore(page < totalPages);
      } catch (error) {
        console.error("Dropdown fetch failed:", error);
      } finally {
        setLoadingDropdown(false);
      }
    },
    [dropdownPage, dropdownHasMore, loadingDropdown]
  );

  const searchDropdown = useCallback(async (query) => {
    setLoadingDropdown(true);
    try {
      const res = await instance.get(
        `/material?page=1&limit=20&search=${query}`
      );
      const data = res.data.data;
      const totalPages = res.data.pagination.totalPages;

      setDropdownItems(data);
      setDropdownPage(2);
      setDropdownHasMore(totalPages > 1);
    } catch (error) {
      console.error("Dropdown search failed:", error);
    } finally {
      setLoadingDropdown(false);
    }
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (term.trim()) {
        searchDropdown(term);
      } else {
      }
    }, 300);
  };

  const lastItemRef = useCallback(
    (node) => {
      if (loadingDropdown) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && dropdownHasMore && !searchTerm) {
          fetchDropdown();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loadingDropdown, dropdownHasMore, fetchDropdown, searchTerm]
  );

  const handleOpen = () => {
    setIsOpen(true);

    if (dropdownItems.length === 0) {
      fetchDropdown(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const selectedItem = dropdownItems.find((i) => i._id === value);

  return (
    <div className="relative">
      {/* Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white text-left flex items-center justify-between"
      >
        <span className={selectedItem ? "text-gray-700" : "text-gray-400"}>
          {selectedItem ? selectedItem.name : placeholder || "Select item"}
        </span>
        <ChevronDown className="text-gray-400 w-4 h-4" />
      </button>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={handleClose} />

          {/* Dropdown box */}
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b bg-white">
              <input
                type="text"
                placeholder="Search item..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto py-1">
              {dropdownItems.length === 0 && !loadingDropdown ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No items found
                </div>
              ) : (
                dropdownItems.map((item, index) => {
                  const isLast = index === dropdownItems.length - 1;

                  return (
                    <button
                      key={item._id}
                      ref={isLast ? lastItemRef : null}
                      onClick={() => {
                        onChange(item._id);
                        handleClose();
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                        value === item._id
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })
              )}

              {loadingDropdown && (
                <div className="px-4 py-3 flex items-center justify-center">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              )}

              {!dropdownHasMore &&
                dropdownItems.length > 0 &&
                !loadingDropdown &&
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
