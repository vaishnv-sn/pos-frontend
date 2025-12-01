import React, { useState } from "react";
import OrderHeader from "../components/pos/OrderHeader";
import CustomerInputs from "../components/pos/CustomerInputs";
import OrderTable from "../components/pos/OrderTable";
import OrderSummary from "../components/pos/OrderSummary";
import OrderActions from "../components/pos/OrderActions";
import CategoryList from "../components/pos/CategoryList";
import ItemGrid from "../components/pos/ItemGrid";
import MaterialListModal from "../components/ui/MaterialListModal";
import MaterialFormModal from "../components/material/MaterialFormActions";

const SalesPage = () => {
  const [isMaterialModalOpen, setMaterialModalOpen] = useState(false);
  const [isMaterialFormOpen, setMaterialFormOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-100">
      <div className="w-full lg:w-[40%] flex flex-col gap-4 overflow-auto h-[40%] lg:h-full border-b lg:border-b-0 lg:border-r border-gray-300">
        <OrderHeader title="Sales" />
        <CustomerInputs />
        <OrderTable />
        <OrderSummary />
      </div>

      <div className="w-full lg:w-[60%] flex flex-col h-[60%] lg:h-full overflow-hidden">
        <div className="h-[70%] flex no-scrollbar">
          <div className="w-[33.33%] border-l border-white no-scrollbar bg-white overflow-auto">
            <CategoryList />
          </div>

          <div className="w-[66.67%] border-l border-white bg-white overflow-auto">
            <ItemGrid />
          </div>
        </div>

        <div className="h-[30%] p-4 bg-white">
          <OrderActions
            onOpenMaterialModal={() => setMaterialModalOpen(true)}
          />
        </div>
        <MaterialListModal
          isOpen={isMaterialModalOpen}
          onClose={() => setMaterialModalOpen(false)}
          onNewItem={() => {
            setEditItemData(null);
            setMaterialFormOpen(true);
          }}
          onEditItem={(item) => {
            setEditItemData(item);
            setMaterialFormOpen(true);
          }}
        />
        <MaterialFormModal
          isOpen={isMaterialFormOpen}
          onClose={() => {
            setMaterialFormOpen(false);
            setMaterialModalOpen(true);
          }}
          editItemData={editItemData}
        />
      </div>
    </div>
  );
};

export default SalesPage;
