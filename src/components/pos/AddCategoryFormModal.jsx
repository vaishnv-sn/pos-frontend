// components/material/CategoryFormModal.jsx
import React, { useState } from "react";
import Modal from "../ui/ModalShell";
import Input from "../ui/InputField";
import Label from "../ui/LabelStandard";

const CategoryFormModal = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    if (categoryName.trim()) {
      onSave(categoryName.trim());
      setCategoryName("");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Category"
      footerActions={
        <>
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!categoryName.trim()}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Category
          </button>
        </>
      }
    >
      <div>
        <Label required>Category Name</Label>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          autoFocus
        />
      </div>
    </Modal>
  );
};

export default CategoryFormModal;
