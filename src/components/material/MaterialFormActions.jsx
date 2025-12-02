import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import usePosStore from "../../store/usePosStore";
import Input from "../ui/InputField";
import Label from "../ui/LabelStandard";
import Select from "../ui/Select";
import TaxToggle from "../ui/TaxToggle";
import Modal from "../ui/ModalShell";
import instance from "../../lib/axios";
import CategorySelect from "../ui/CategorySelect";
import CategoryFormModal from "../pos/AddCategoryFormModal";

/* ------------------------------------------
   INITIAL FORM VALUES
------------------------------------------ */
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

/* ------------------------------------------
   NORMALIZER — converts backend item → form
------------------------------------------ */
const normalizeItem = (item = {}) => ({
  _id: item._id || "",

  name: item.name || "",
  hsn: item.hsn || "",
  code: item.code || "",
  barcode: item.barcode || "",

  categoryId: item.categoryId?._id || item.categoryId || "",

  unitPrimary: item.unitPrimary?._id || item.unitPrimary || "",
  unitSecondary: item.unitSecondary?._id || item.unitSecondary || "",

  conversionFactor: item.conversionFactor || 1,

  purchaseRate: item.purchaseRate || "",
  retailRate: item.retailRate || "",
  wholesaleRate: item.wholesaleRate || "",

  taxId: item.taxId?._id || item.taxId || "",
  purchaseRateIncludeTax: item.purchaseRateIncludeTax ?? true,
  retailRateIncludeTax: item.retailRateIncludeTax ?? true,
  wholesaleRateIncludeTax: item.wholesaleRateIncludeTax ?? true,

  batchEnabled: item.batchEnabled || false,
  serialNumberEnabled: item.serialNumberEnabled || false,

  discountAmount: item.discount?.amount || "",
  discountType: item.discount?.type || "",

  warehouseId: item.warehouseId?._id || item.warehouseId || "",

  imageUrl: item.imageUrl || "",
});

export default function MaterialFormModal({ isOpen, onClose, editItemId }) {
  const {
    categories,
    units,
    warehouses,
    taxes,
    fetchUnits,
    fetchWarehouses,
    fetchTaxes,
    fetchCategories,
  } = usePosStore();

  const [form, setForm] = useState(initialForm);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const isEdit = Boolean(editItemId);

  /* ------------------------------------------
     GENERIC UPDATE FUNCTION
  ------------------------------------------ */
  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* ------------------------------------------
     LOAD ALL DROPDOWNS
  ------------------------------------------ */
  useEffect(() => {
    fetchUnits();
    fetchWarehouses();
    fetchTaxes();
    fetchCategories();
  }, []);

  /* ------------------------------------------
     LOAD EDIT DATA
  ------------------------------------------ */
  useEffect(() => {
    if (!isOpen) return;

    if (isEdit) {
      loadItem(editItemId);
    } else {
      setForm(initialForm);
    }
  }, [isOpen, editItemId]);

  const loadItem = async (id) => {
    try {
      const res = await instance.get(`/material/${id}`);
      setForm(normalizeItem(res.data.data));
    } catch (err) {
      console.error("Failed to load material:", err);
    }
  };

  /* ------------------------------------------
     SAVE HANDLER
  ------------------------------------------ */
  const handleSave = async () => {
    try {
      if (isEdit) {
        await instance.put(`/material/${editItemId}`, form);
      } else {
        await instance.post("/material", form);
      }
      onClose();
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  /* ------------------------------------------
     ADD CATEGORY
  ------------------------------------------ */
  const handleAddCategory = async (name) => {
    try {
      const res = await instance.post("/category", { name });
      const newCat = res.data.data;

      await fetchCategories();

      update("categoryId", newCat._id);
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  /* ------------------------------------------
     OPTION MAPS
  ------------------------------------------ */
  const categoryOptions = categories.map((c) => ({
    value: c._id,
    label: c.name,
  }));

  const unitOptions = units.map((u) => ({
    value: u._id,
    label: u.name,
  }));

  const taxOptions = taxes.map((t) => ({
    value: t._id,
    label: `${t.name} (${t.rate}%)`,
  }));

  const warehouseOptions = warehouses.map((w) => ({
    value: w._id,
    label: w.name,
  }));

  /* ------------------------------------------
     UI (NO VISUAL CHANGES)
  ------------------------------------------ */
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Edit Material" : "New Material"}
        footerActions={
          <>
            {!isEdit && (
              <button
                onClick={() => setForm(initialForm)}
                className="px-6 py-2 text-sm font-medium bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                Clear All
              </button>
            )}

            <button
              onClick={handleSave}
              className="px-8 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </>
        }
      >
        {/* ------------------------- TOP: TYPE ------------------------- */}
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
                onChange={(v) => update("type", v)}
              />
            </div>
          </div>
        </div>

        {/* ------------------------- GRID ------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* Category */}
            <div>
              <Label>Category</Label>
              <CategorySelect
                value={form.categoryId}
                onChange={(v) => update("categoryId", v)}
                placeholder="Select category"
                onAddNew={() => setCategoryModalOpen(true)}
              />
            </div>

            {/* Name / HSN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label required>Item Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <Label>Item HSN</Label>
                <Input
                  value={form.hsn}
                  onChange={(e) => update("hsn", e.target.value)}
                  placeholder="Enter HSN"
                />
              </div>
            </div>

            {/* Code / Barcode */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Item Code</Label>
                <Input
                  value={form.code}
                  onChange={(e) => update("code", e.target.value)}
                />
              </div>
              <div>
                <Label>Barcode</Label>
                <Input
                  value={form.barcode}
                  onChange={(e) => update("barcode", e.target.value)}
                />
              </div>
            </div>

            {/* Units */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label required>Unit Primary</Label>
                <Select
                  value={form.unitPrimary}
                  options={unitOptions}
                  onChange={(v) => update("unitPrimary", v)}
                />
              </div>

              <div>
                <Label>Secondary</Label>
                <Select
                  value={form.unitSecondary}
                  options={unitOptions}
                  onChange={(v) => update("unitSecondary", v)}
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

            {/* Image */}
            <div>
              <Label>Item Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
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
                  defaultInclude={form.wholesaleRateIncludeTax}
                  onChange={(v) => update("wholesaleRateIncludeTax", v)}
                />
              </div>
              <Input
                value={form.wholesaleRate}
                onChange={(e) => update("wholesaleRate", e.target.value)}
              />
            </div>

            {/* Tax / Warehouse */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tax %</Label>
                <Select
                  value={form.taxId}
                  options={taxOptions}
                  onChange={(v) => update("taxId", v)}
                />
              </div>
              <div>
                <Label>Warehouse</Label>
                <Select
                  value={form.warehouseId}
                  options={warehouseOptions}
                  onChange={(v) => update("warehouseId", v)}
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

      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onSave={handleAddCategory}
      />
    </>
  );
}
