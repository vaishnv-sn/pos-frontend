import React, { useState, useEffect } from "react";
import { X, Upload, ChevronDown } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* REUSABLE UI HELPERS                             */
/* -------------------------------------------------------------------------- */

// Standard Label
const Label = ({ children, required }) => (
  <label className="block text-sm text-gray-700 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

// Standard Input
const Input = ({
  placeholder,
  value,
  type = "text",
  className = "",
  disabled = false,
}) => (
  <input
    type={type}
    disabled={disabled}
    className={`w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-50 ${className}`}
    placeholder={placeholder}
    defaultValue={value}
  />
);

// Standard Select
const Select = ({ placeholder, value, options = [], disabled = false }) => (
  <div className="relative">
    <select
      disabled={disabled}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 appearance-none bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
    >
      <option value="">{value || placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
  </div>
);

// Tax Toggle Helper (Radio Buttons)
const TaxToggle = ({ name, defaultInclude = true }) => (
  <div className="flex items-center space-x-4">
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name={name}
        defaultChecked={defaultInclude}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <span className="ml-2 text-sm text-gray-600">Include Tax</span>
    </label>
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name={name}
        defaultChecked={!defaultInclude}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <span className="ml-2 text-sm text-gray-600">Exclude Tax</span>
    </label>
  </div>
);

/* -------------------------------------------------------------------------- */
/* REUSABLE MODAL SHELL                              */
/* -------------------------------------------------------------------------- */

const Modal = ({ isOpen, onClose, title, children, footerActions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end space-x-3 rounded-b-lg">
          {footerActions}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SPECIFIC FORM IMPLEMENTATION                        */
/* -------------------------------------------------------------------------- */

export default function MaterialFormModal({ isOpen, onClose, editItemData }) {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editItemData) {
      setForm({
        ...editItemData,
      });
    }
  }, [editItemData]);

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center justify-center gap-4">
      {/* Trigger Buttons for Demo */}
      <button
        onClick={() => {
          onClose();
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open New Material
      </button>
      <button
        onClick={() => {
          console.log("yes here");

          setIsEditMode(true);
          onClose();
        }}
        className="px-4 py-2 bg-emerald-600 text-white rounded"
      >
        Open Edit Material
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        title={isEditMode ? "Edit Material" : "New Material"}
        footerActions={
          isEditMode ? (
            <button className="px-8 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              Update
            </button>
          ) : (
            <>
              <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded transition-colors">
                Clear all
              </button>
              <button className="px-6 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 rounded transition-colors">
                Save & New
              </button>
              <button className="px-8 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors">
                Save
              </button>
            </>
          )
        }
      >
        {/* Goods/Services Dropdown - Top Right */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Goods/Services</span>
            <div className="w-40">
              <Select value="Goods" options={["Goods", "Services"]} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* --- LEFT COLUMN: Item Details --- */}
          <div className="space-y-4">
            {/* Group Selection */}
            <div>
              <Label>Item group selection</Label>
              <div className="relative">
                <Select
                  value={isEditMode ? "SMOKING" : ""}
                  placeholder="Select category"
                />
                {isEditMode && (
                  <button className="absolute right-10 top-2 text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Name & HSN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label required>Item Name</Label>
                <Input
                  placeholder="Enter item name"
                  value={isEditMode ? "DAVIDOFF ONE SLIM" : ""}
                />
              </div>
              <div>
                <Label>Item Hsn</Label>
                <Input placeholder="Enter item hsn" />
              </div>
            </div>

            {/* Code & Barcode */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Item code</Label>
                <Input placeholder="Enter item code" />
              </div>
              <div>
                <Label>Barcode</Label>
                <Input
                  placeholder="Barcode"
                  value={isEditMode ? "4030600024706" : ""}
                />
              </div>
            </div>

            {/* Units Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label required>Unit Primary</Label>
                <Select
                  value={isEditMode ? "Box" : ""}
                  placeholder="Select unit"
                />
              </div>
              <div>
                <Label>Secondary</Label>
                <Select
                  value={isEditMode ? "Pieces" : ""}
                  placeholder="Select unit"
                />
              </div>
              <div>
                <Label required>CF</Label>
                <Input placeholder="CF" value={isEditMode ? "10" : ""} />
              </div>
            </div>

            {/* Tax & Toggles */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Tax %</Label>
                <Select
                  value={isEditMode ? "VAT (10%)" : ""}
                  placeholder="Select tax"
                />
              </div>

              <div>
                <Label>Batch</Label>
                <div className="flex items-center h-[42px]">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Enabled</span>
                  </label>
                </div>
              </div>

              <div>
                <Label>Serial Number</Label>
                <div className="flex items-center h-[42px]">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Enabled</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label>Item image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600">
                  Upload image (max 5MB)
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  PNG, JPG supported
                </span>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Pricing & Inventory --- */}
          <div className="space-y-4">
            {/* Purchase Rate */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label>Purchase Rate</Label>
                <TaxToggle name="purchase_tax" />
              </div>
              <Input placeholder="" />
            </div>

            {/* Retail Rate */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label>Retail Rate</Label>
                <TaxToggle name="retail_tax" defaultInclude={true} />
              </div>
              <Input placeholder="" value={isEditMode ? "24.500" : ""} />
            </div>

            {/* Wholesale Rate */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label>Wholesale Rate</Label>
                <TaxToggle name="wholesale_tax" defaultInclude={true} />
              </div>
              <Input placeholder="" />
            </div>

            {/* Discount & Warehouse */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Discount Amount</Label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Discount at"
                    className="w-full border border-r-0 border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <select className="bg-white border border-gray-300 rounded-r px-3 py-2 text-sm text-gray-600 focus:outline-none min-w-20">
                    <option>Type</option>
                    <option>%</option>
                    <option>Fixed</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Warehouse</Label>
                <Select
                  value={isEditMode ? "Main Godown" : ""}
                  placeholder="Select warehouse"
                />
              </div>
            </div>

            {/* Opening Stock Checkbox */}
            <div className="pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Enabled Opening Stock
                </span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
