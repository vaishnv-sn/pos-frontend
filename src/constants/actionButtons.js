// src/constants/actionButtons.js
// This file only contains config (no icon imports). OrderActions maps icon keys to actual icon components.
export const ACTION_GRID = [
  [
    {
      key: "hold",
      label: "Hold",
      variant: "warning",
      colSpan: 1,
      icon: "Pause",
    },
    {
      key: "recall",
      label: "Recall",
      variant: "warning",
      icon: "CornerUpLeft",
    },
    { key: "addQty", label: "+ QTY", variant: "warning", icon: "Plus" },
    { key: "delAll", label: "Del All", variant: "danger", icon: "Trash2" },
    {
      key: "previewSave",
      label: "PREVIEW & SAVE",
      variant: "success",
      colSpan: 2,
      icon: "Save",
    },
  ],
  [
    { key: "prev", label: "Prev", variant: "warning", icon: "ChevronLeft" },
    { key: "next", label: "Next", variant: "warning", icon: "ChevronRight" },
    { key: "subQty", label: "- QTY", variant: "warning", icon: "Minus" },
    { key: "delRow", label: "Del Row", variant: "danger", icon: "Trash" },
    {
      key: "savePrint",
      label: "SAVE & PRINT",
      variant: "success",
      colSpan: 2,
      icon: "Printer",
    },
  ],
  [
    { key: "reprint", label: "Reprint", variant: "light", icon: "RotateCw" },
    { key: "sreturn", label: "$ Return", variant: "light", icon: "RotateCcw" },
    { key: "clear", label: "Clear", variant: "light", icon: "X" },
    { key: "price", label: "Price", variant: "light", icon: "DollarSign" },
    { key: "accounts", label: "Accounts", variant: "light", icon: "Users" },
    { key: "item", label: "Item", variant: "light", icon: "Package" },
  ],
];
