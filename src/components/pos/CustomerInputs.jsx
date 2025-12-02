import React, { useEffect, useMemo } from "react";
import usePosStore from "../../store/usePosStore";
import useAuthStore from "../../store/authStore";
import MaterialSelect from "../ui/MaterialSelect";

const CustomerInputs = () => {
  const {
    customerDetails,
    updateCustomerDetails,
    addItemByBarcode,
    barcodeLoading,
    barcodeError,
    items,
    addItem,
  } = usePosStore();
  const { user } = useAuthStore();

  // Populate user field with logged-in user data
  useEffect(() => {
    if (user?.phone) {
      updateCustomerDetails({ user: user.phone });
    }
  }, [user]);



  const handleBarcodeKeyDown = async (e) => {
    if (e.key === "Enter" && !barcodeLoading) {
      const result = await addItemByBarcode(customerDetails.barCode);
      if (result.success) {
        updateCustomerDetails({ barCode: "" });
      }
      // Error is handled by store state
    }
  };



  const handleItemSelect = (val) => {
    const selectedItem = items.find((item) => item._id === val);
    if (selectedItem) {
      addItem(selectedItem);
      // Optional: Clear selection to allow re-selecting the same item
      updateCustomerDetails({ item: "" });
    } else {
      updateCustomerDetails({ item: val });
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
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 cursor-not-allowed"
            title="Auto-populated from logged-in user"
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
          <label className="text-xs text-gray-600 mb-1 flex justify-between">
            <span>Bar Code</span>
            {barcodeLoading && (
              <span className="text-blue-500 animate-pulse">Scanning...</span>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerDetails.barCode}
              onChange={(e) =>
                updateCustomerDetails({ barCode: e.target.value })
              }
              onKeyDown={handleBarcodeKeyDown}
              placeholder="Bar Code"
              disabled={barcodeLoading}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                barcodeError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              } ${barcodeLoading ? "bg-gray-50" : ""}`}
            />
            {barcodeError && (
              <p className="text-xs text-red-500 mt-1 absolute -bottom-5 left-0">
                {barcodeError}
              </p>
            )}
          </div>
        </div>
        <div>
          <MaterialSelect
            placeholder="Select Item"
            value={customerDetails.item}
            onChange={handleItemSelect}
            disabled={barcodeLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomerInputs);
