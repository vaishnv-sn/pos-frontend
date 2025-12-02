import React, { useState, useEffect, useCallback } from "react";
import { X, Search, Plus, MoreVertical } from "lucide-react";
import usePosStore from "../../store/usePosStore";

const MaterialListModal = ({ isOpen, onClose, onNewItem, onEditItem }) => {
  const { modalItems, modalItemsPagination, loadingModalItems } = usePosStore();
  const fetchModalItems = usePosStore((s) => s.fetchModalItems);
  const searchModalItems = usePosStore((s) => s.searchModalItems);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Prevent page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Load items
  const loadItems = useCallback(() => {
    const q = searchQuery.trim();
    if (q) {
      searchModalItems(q, currentPage);
    } else {
      fetchModalItems(currentPage);
    }
  }, [searchQuery, currentPage, searchModalItems, fetchModalItems]);

  // Initial + page change fetch
  useEffect(() => {
    if (!isOpen) return;

    const q = searchQuery.trim();
    if (!q) {
      fetchModalItems(currentPage);
    }
  }, [isOpen, currentPage, fetchModalItems]);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;
    const q = searchQuery.trim();
    if (!q) return;

    const handler = setTimeout(() => {
      setCurrentPage(1);
      searchModalItems(q, 1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, isOpen, searchModalItems]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setCurrentPage(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const pagination = modalItemsPagination || {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  };

  return (
    // ⭐ ONE SINGLE OVERLAY — clicking it closes modal
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* ⭐ Stop click propagation so clicking inside doesn't close */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Material List</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-1 rounded"
          >
            <X size={22} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-6 py-4 border-b">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by item name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              onClick={() => {
                onClose();
                onNewItem();
              }}
            >
              <Plus size={20} /> Add Item
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {loadingModalItems ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : modalItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchQuery ? "No items found" : "No items available"}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    CATEGORY
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    ITEM NAME
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    CODE
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    RETAIL PRICE
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    UNIT
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700" />
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {modalItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.category || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.code || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-right">
                      ₹{Number(item.retailRate || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {item.unitPrimary || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          onClose();
                          onEditItem(item);
                        }}
                        className="text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {pagination.total === 0
              ? "No items"
              : `Showing ${
                  (pagination.page - 1) * pagination.limit + 1
                } – ${Math.min(
                  pagination.page * pagination.limit,
                  pagination.total
                )} of ${pagination.total}`}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || loadingModalItems}
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
            >
              «
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm">Page</span>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Number(e.target.value);
                  if (page >= 1 && page <= pagination.totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 border rounded text-center py-1"
                min="1"
                max={pagination.totalPages}
              />
              <span className="text-sm">of {pagination.totalPages}</span>
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))
              }
              disabled={
                currentPage === pagination.totalPages || loadingModalItems
              }
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialListModal;
