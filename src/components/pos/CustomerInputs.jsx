import React from "react";
import usePosStore from "../../store/usePosStore";

const CustomerInputs = () => {
  const { customerDetails, updateCustomerDetails, addItemByBarcode } =
    usePosStore();

  const handleBarcodeKeyDown = (e) => {
    if (e.key === "Enter") {
      const success = addItemByBarcode(customerDetails.barCode);
      if (success) {
        updateCustomerDetails({ barCode: "" });
      } else {
        // Optional: Show error or beep
        console.log("Item not found");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Invoice No</label>
          <input
            type="text"
            value={customerDetails.invoiceNo}
            onChange={(e) =>
              updateCustomerDetails({ invoiceNo: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1 block">User</label>
          <input
            type="text"
            value={customerDetails.user}
            onChange={(e) => updateCustomerDetails({ user: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1 block invisible">
            Date
          </label>
          <input
            type="text"
            value={customerDetails.date}
            onChange={(e) => updateCustomerDetails({ date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Customer Name
          </label>
          <input
            type="text"
            value={customerDetails.customerName}
            onChange={(e) =>
              updateCustomerDetails({ customerName: e.target.value })
            }
            placeholder="Customer Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1 block invisible">
            Payment
          </label>
          <select
            value={customerDetails.paymentMethod}
            onChange={(e) =>
              updateCustomerDetails({ paymentMethod: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
          </select>
        </div>
      </div>

      {/* Row 3 */}
      <div>
        <label className="text-xs text-gray-600 mb-1 block">Phone</label>
        <input
          type="text"
          value={customerDetails.phone}
          onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
          placeholder="Phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Bar Code</label>
          <input
            type="text"
            value={customerDetails.barCode}
            onChange={(e) => updateCustomerDetails({ barCode: e.target.value })}
            onKeyDown={handleBarcodeKeyDown}
            placeholder="Bar Code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Item</label>
          <input
            type="text"
            value={customerDetails.item}
            onChange={(e) => updateCustomerDetails({ item: e.target.value })}
            placeholder="Item"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInputs;
