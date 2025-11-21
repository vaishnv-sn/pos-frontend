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
      {/* LEFT SECTION – 40% */}
      <div className="w-[40%] flex flex-col gap-4 overflow-auto">
        <OrderHeader title="Sales" />
        <CustomerInputs />
        <OrderTable />
        <OrderSummary />
      </div>

      {/* MIDDLE + RIGHT SECTION – 60% COMBINED */}
      <div className="w-[60%] flex flex-col">
        {/* TOP ROW – 70% HEIGHT */}
        <div className="h-[70%] flex">
          {/* CATEGORY LIST – 33.33% of the 60% (which is 20% of total) */}
          <div className="w-[33.33%] border-l border-white bg-white overflow-auto">
            <CategoryList />
          </div>

          {/* ITEM GRID – 66.67% of the 60% (which is 40% of total) */}
          <div className="w-[66.67%] border-l border-white bg-white overflow-auto">
            <ItemGrid />
          </div>
        </div>

        {/* BOTTOM: ACTION PANEL – 30% HEIGHT (spans full 60% width) */}
        <div className="h-[30%] border p-4 bg-white">
          <OrderActions />
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
