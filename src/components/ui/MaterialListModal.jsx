import React, { useState } from "react";
import { X, Search, Plus, MoreVertical } from "lucide-react";

const MaterialListModal = ({ isOpen, onClose, onAddItem }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sample data - replace with your actual data
  const [items] = useState([
    { type: "G", name: "DAVIDOFF ONE SLIM", price: 24.5 },
    { type: "G", name: "MARLBORO SILVER BLUE", price: 23.5 },
    { type: "G", name: "MARLBORO VISTA", price: 23.5 },
    { type: "G", name: "MARLBORO TOUCH", price: 19.5 },
    { type: "G", name: "SCISSORS RED SMALL", price: 12.7 },
    { type: "G", name: "WILLS RED SMALL", price: 13.7 },
    { type: "G", name: "DAVIDOFF GOLD", price: 24.5 },
    { type: "G", name: "MARLBORO WHITE", price: 23.5 },
    { type: "G", name: "MARLBORO RED", price: 23.5 },
    { type: "G", name: "MARLBORO GOLD", price: 23.5 },
    { type: "G", name: "DAVIDOFF ONE", price: 23.5 },
    { type: "G", name: "DUNHILL GOLD", price: 16.5 },
    // Add more items to reach 731 records
    ...Array.from({ length: 719 }, (_, i) => ({
      type: "G",
      name: `ITEM ${i + 13}`,
      price: (Math.random() * 30 + 10).toFixed(1),
    })),
  ]);

  // Filter items based on search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handleItemAction = (item) => {
    console.log("Item action:", item);
    // Add your item action logic here
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 className="text-xl font-semibold">Material List</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-700 rounded p-1 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by item name....."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                <Plus size={20} />
                Add Item
              </button>
            </div>
          </div>

          {/* Table */}
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
                        onClick={() => handleItemAction(item)}
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

          {/* Footer - Pagination */}
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredItems.length)} of{" "}
              {filteredItems.length} records
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                «
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Page</span>
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">of {totalPages}</span>
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
