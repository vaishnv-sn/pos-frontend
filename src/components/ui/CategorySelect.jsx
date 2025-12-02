import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, Plus, Loader2 } from "lucide-react";
import instance from "../../lib/axios";

const CategorySelect = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  onAddNew,
}) => {
  const [dropdownCategories, setDropdownCategories] = useState([]);
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
        const res = await instance.get(
          `/materialCategory?page=${page}&limit=20`
        );
        const data = res.data.data;
        const totalPages = res.data.pagination.totalPages;

        setDropdownCategories((prev) => (reset ? data : [...prev, ...data]));
        setDropdownPage(page + 1);
        setDropdownHasMore(page < totalPages);
      } catch (error) {
        console.error("Category dropdown fetch failed:", error);
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
        `/materialCategory?page=1&limit=20&search=${query}`
      );

      const data = res.data.data;
      const totalPages = res.data.pagination.totalPages;

      setDropdownCategories(data);
      setDropdownPage(2);
      setDropdownHasMore(totalPages > 1);
    } catch (error) {
      console.error("Category search failed:", error);
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
        fetchDropdown(true);
      }
    }, 300);
  };

  const lastCategoryRef = useCallback(
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

    if (dropdownCategories.length === 0) {
      fetchDropdown(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const selectedCategory = dropdownCategories.find((cat) => cat._id === value);

  return (
    <div className="relative">
      {/* Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white text-left flex items-center justify-between"
      >
        <span className={selectedCategory ? "text-gray-700" : "text-gray-400"}>
          {selectedCategory
            ? selectedCategory.name
            : placeholder || "Select category"}
        </span>
        <ChevronDown className="text-gray-400 w-4 h-4" />
      </button>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={handleClose} />

          {/* Main dropdown */}
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 flex flex-col overflow-hidden">
            {/* Search input */}
            <div className="p-2 border-b bg-white">
              <input
                type="text"
                placeholder="Search category..."
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
              />
            </div>

            {/* Add new category */}
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

            {/* Category list */}
            <div className="flex-1 overflow-auto py-1">
              {dropdownCategories.length === 0 && !loadingDropdown ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No categories found
                </div>
              ) : (
                dropdownCategories.map((cat, index) => {
                  const isLast = index === dropdownCategories.length - 1;

                  return (
                    <button
                      key={cat._id}
                      ref={isLast ? lastCategoryRef : null}
                      onClick={() => {
                        onChange(cat._id);
                        handleClose();
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                        value === cat._id
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })
              )}

              {/* Loading */}
              {loadingDropdown && (
                <div className="px-4 py-3 flex items-center justify-center">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              )}

              {/* End of list */}
              {!dropdownHasMore &&
                dropdownCategories.length > 0 &&
                !loadingDropdown &&
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
