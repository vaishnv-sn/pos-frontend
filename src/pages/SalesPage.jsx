import React from "react";
import OrderHeader from "../components/pos/OrderHeader";
import CustomerInputs from "../components/pos/CustomerInputs";
import OrderTable from "../components/pos/OrderTable";
import OrderSummary from "../components/pos/OrderSummary";
import OrderActions from "../components/pos/OrderActions";
import CategoryList from "../components/pos/CategoryList";
import ItemGrid from "../components/pos/ItemGrid";

const SalesPage = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-gray-100">
      <div className="w-[40%] flex flex-col gap-4 overflow-auto">
        <OrderHeader title="Sales" />
        <CustomerInputs />
        <OrderTable />
        <OrderSummary />
      </div>

      <div className="w-[60%] flex flex-col no-scrollbar">
        <div className="h-[70%] flex no-scrollbar">
          <div className="w-[33.33%] border-l border-white no-scrollbar bg-white overflow-auto">
            <CategoryList />
          </div>

          <div className="w-[66.67%] border-l border-white bg-white overflow-auto">
            <ItemGrid />
          </div>
        </div>

        <div className="h-[30%] p-4 bg-white">
          <OrderActions />
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
