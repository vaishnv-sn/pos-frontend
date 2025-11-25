import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import usePosStore from "../../store/usePosStore";
import Input from "../ui/InputField";
import Label from "../ui/LabelStandard";
import Select from "../ui/Select";
import TaxToggle from "../ui/TaxToggle";
import Modal from "../ui/ModalShell";
import instance from "../../lib/axios";

// ------------------------------------------
// INITIAL FORM STATE
// ------------------------------------------
const initialForm = {
  name: "",
  hsn: "",
  code: "",
  barcode: "",
  categoryId: "",
  unitPrimary: "",
  unitSecondary: "",
  conversionFactor: 1,

  purchaseRate: "",
  retailRate: "",
  wholesaleRate: "",

  taxId: "",
  purchaseRateIncludeTax: true,
  retailRateIncludeTax: true,
  wholesaleRateIncludeTax: true,

  batchEnabled: false,
  serialNumberEnabled: false,

  discountAmount: "",
  discountType: "",

  warehouseId: "",
  imageUrl: "",
};

export default function MaterialFormModal({ isOpen, onClose, editItemData }) {
  const {
    categories,
    units,
    warehouses,
    taxes,
    fetchUnits,
    fetchWarehouses,
    fetchTaxes,
  } = usePosStore();

  const [form, setForm] = useState(initialForm);
  const isEdit = Boolean(editItemData);

  // Generic update function
  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Load dropdowns + hydrate edit mode
  useEffect(() => {
    fetchUnits();
    fetchWarehouses();
    fetchTaxes();

    if (isEdit && editItemData) {
      setForm({ ...editItemData });
    } else {
      setForm(initialForm);
    }
  }, [editItemData]);

  // Submit handler
  const handleSave = async () => {
    const payload = { ...form };

    try {
      if (isEdit) {
        await instance.put(`/material/${form._id}`, payload);
      } else {
        await instance.post("/material", payload);
      }
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Options must be formatted for <Select>
  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c._id,
  }));

  const unitOptions = units.map((u) => ({
    label: u.name,
    value: u._id,
  }));

  const taxOptions = taxes.map((t) => ({
    label: `${t.name} (${t.rate}%)`,
    value: t._id,
  }));

  const warehouseOptions = warehouses.map((w) => ({
    label: w.name,
    value: w._id,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Material" : "New Material"}
      footerActions={
        <>
          {!isEdit && (
            <button
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              onClick={() => setForm(initialForm)}
            >
              Clear all
            </button>
          )}

          {!isEdit && (
            <button
              className="px-6 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-50"
              onClick={handleSave}
            >
              Save & New
            </button>
          )}

          <button
            className="px-8 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            {isEdit ? "Update" : "Save"}
          </button>
        </>
      }
    >
      {/* Goods / Services */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Goods/Services</span>
          <div className="w-40">
            <Select
              value={form.type ?? "Goods"}
              options={[
                { label: "Goods", value: "Goods" },
                { label: "Services", value: "Services" },
              ]}
              onChange={(val) => update("type", val)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select
              placeholder="Select category"
              value={form.categoryId}
              options={categoryOptions}
              onChange={(val) => update("categoryId", val)}
            />
          </div>

          {/* Name + HSN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label required>Item Name</Label>
              <Input
                value={form.name}
                placeholder="Enter item name"
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div>
              <Label>Item HSN</Label>
              <Input
                value={form.hsn}
                placeholder="Enter item HSN"
                onChange={(e) => update("hsn", e.target.value)}
              />
            </div>
          </div>

          {/* Code + Barcode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Item Code</Label>
              <Input
                value={form.code}
                placeholder="Enter code"
                onChange={(e) => update("code", e.target.value)}
              />
            </div>

            <div>
              <Label>Barcode</Label>
              <Input
                value={form.barcode}
                placeholder="Enter barcode"
                onChange={(e) => update("barcode", e.target.value)}
              />
            </div>
          </div>

          {/* Units */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label required>Unit Primary</Label>
              <Select
                placeholder="Select"
                value={form.unitPrimary}
                options={unitOptions}
                onChange={(val) => update("unitPrimary", val)}
              />
            </div>

            <div>
              <Label>Secondary</Label>
              <Select
                placeholder="Select"
                value={form.unitSecondary}
                options={unitOptions}
                onChange={(val) => update("unitSecondary", val)}
              />
            </div>

            <div>
              <Label required>CF</Label>
              <Input
                value={form.conversionFactor}
                onChange={(e) =>
                  update("conversionFactor", Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Item Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Upload image (max 5MB)
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Purchase Rate */}
          <div>
            <div className="flex justify-between items-center">
              <Label>Purchase Rate</Label>
              <TaxToggle
                name="purchase_tax"
                defaultInclude={form.purchaseRateIncludeTax}
                onChange={(v) => update("purchaseRateIncludeTax", v)}
              />
            </div>
            <Input
              value={form.purchaseRate}
              onChange={(e) => update("purchaseRate", e.target.value)}
            />
          </div>

          {/* Retail Rate */}
          <div>
            <div className="flex justify-between items-center">
              <Label>Retail Rate</Label>
              <TaxToggle
                name="retail_tax"
                defaultInclude={form.retailRateIncludeTax}
                onChange={(v) => update("retailRateIncludeTax", v)}
              />
            </div>
            <Input
              value={form.retailRate}
              onChange={(e) => update("retailRate", e.target.value)}
            />
          </div>

          {/* Wholesale Rate */}
          <div>
            <div className="flex justify-between items-center">
              <Label>Wholesale Rate</Label>
              <TaxToggle
                name="wholesale_tax"
                defaultInclude={form.wholesaleRateIncludeTax}
                onChange={(v) => update("wholesaleRateIncludeTax", v)}
              />
            </div>
            <Input
              value={form.wholesaleRate}
              onChange={(e) => update("wholesaleRate", e.target.value)}
            />
          </div>

          {/* Tax + Warehouse */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tax %</Label>
              <Select
                value={form.taxId}
                options={taxOptions}
                placeholder="Select tax"
                onChange={(val) => update("taxId", val)}
              />
            </div>

            <div>
              <Label>Warehouse</Label>
              <Select
                value={form.warehouseId}
                options={warehouseOptions}
                placeholder="Select warehouse"
                onChange={(val) => update("warehouseId", val)}
              />
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.batchEnabled}
                onChange={(e) => update("batchEnabled", e.target.checked)}
              />
              Batch Enabled
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.serialNumberEnabled}
                onChange={(e) =>
                  update("serialNumberEnabled", e.target.checked)
                }
              />
              Serial Enabled
            </label>
          </div>

          {/* Discount */}
          <div>
            <Label>Discount</Label>
            <div className="flex">
              <Input
                placeholder="Amount"
                value={form.discountAmount}
                onChange={(e) => update("discountAmount", e.target.value)}
                className="rounded-r-none"
              />
              <select
                className="border border-gray-300 rounded-r px-3"
                value={form.discountType}
                onChange={(e) => update("discountType", e.target.value)}
              >
                <option value="">Type</option>
                <option value="PERCENT">%</option>
                <option value="FIXED">Fixed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
