import React, { useState } from "react";
import { X, Search, Plus, MoreVertical } from "lucide-react";
import usePosStore from "../../store/usePosStore";

const MaterialListModal = ({ isOpen, onClose, onNewItem }) => {
  const { items } = usePosStore(); // ⭐ Use items from Zustand

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (!isOpen) return null;

  // Filter items based on search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
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

          {/* SEARCH BAR */}
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
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
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    TYPE ⇅
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    ITEM NAME ⇅
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    PRICE ⇅
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.price}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          onClose(); // close list modal
                          onEditItem(item); // open form modal with item data
                        }}
                        className="text-gray-600 hover:text-gray-800 p-1"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} –{" "}
              {Math.min(startIndex + itemsPerPage, filteredItems.length)} of{" "}
              {filteredItems.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                «
              </button>

              <div className="flex items-center gap-2">
                <span>Page</span>
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => {
                    const page = Number(e.target.value);
                    if (page >= 1 && page <= totalPages) setCurrentPage(page);
                  }}
                  className="w-16 border rounded text-center"
                />
                <span>of {totalPages}</span>
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialListModal;
