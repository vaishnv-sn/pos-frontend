import React from "react";
import usePosStore from "../../store/usePosStore";
import {
  Pause,
  RefreshCw,
  Plus,
  Trash2,
  Save,
  Printer,
  ChevronLeft,
  ChevronRight,
  Minus,
  FileText,
  DollarSign,
  RotateCcw,
  X,
  Users,
  Package,
} from "lucide-react";

import MaterialListModal from "../ui/MaterialListModal";

const ICON_MAP = {
  hold: <Pause size={18} />,
  recall: <RefreshCw size={18} />,
  addQty: <Plus size={18} />,
  delAll: <Trash2 size={18} />,
  previewSave: <Save size={18} />,
  savePrint: <Printer size={18} />,

  prev: <ChevronLeft size={18} />,
  next: <ChevronRight size={18} />,
  subQty: <Minus size={18} />,
  delRow: <Trash2 size={18} />,
  report: <FileText size={18} />,
  cash: <DollarSign size={18} />,

  reprint: <Printer size={18} />,
  return: <RotateCcw size={18} />,
  clear: <X size={18} />,
  price: <DollarSign size={18} />,
  accounts: <Users size={18} />,
  item: <Package size={18} />,
  balance: <DollarSign size={18} />,
};

const ActionButton = ({
  label,
  iconKey,
  onClick,
  variant = "default",
  className = "",
}) => {
  const variants = {
    yellow:
      "bg-yellow-200 text-gray-800 hover:bg-yellow-300 border border-yellow-300",
    red: "bg-red-300 text-white hover:bg-red-400 border border-red-400",
    green:
      "bg-green-500 text-white hover:bg-green-600 border border-green-600 font-semibold",
    purple:
      "bg-purple-100 text-gray-700 hover:bg-purple-200 border border-purple-200",
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${variants[variant]}
        py-3 px-4 rounded-lg font-medium text-sm transition-all
        flex flex-col items-center justify-center gap-1
        ${className}
      `}
    >
      {iconKey && <span>{ICON_MAP[iconKey]}</span>}
      <span>{label}</span>
    </button>
  );
};

const OrderActions = () => {
  const {
    clearOrder,
    deleteSelectedItems,
    incrementSelectedQty,
    decrementSelectedQty,
  } = usePosStore();

  return (
    <div className="h-full flex flex-col justify-between gap-4">
      {/* ROW 1 */}
      <div className="grid grid-cols-14 gap-2">
        <ActionButton
          className="col-span-2"
          label="Hold"
          iconKey="hold"
          variant="yellow"
        />
        <ActionButton
          className="col-span-2"
          label="Recall"
          iconKey="recall"
          variant="yellow"
        />
        <ActionButton
          className="col-span-2"
          label="QTY"
          iconKey="addQty"
          variant="yellow"
          onClick={incrementSelectedQty}
        />
        <ActionButton
          className="col-span-2"
          label="Del All"
          iconKey="delAll"
          variant="red"
          onClick={clearOrder}
        />

        <ActionButton
          className="col-span-3"
          label="PREVIEW & SAVE"
          iconKey="previewSave"
          variant="green"
        />
        <ActionButton
          className="col-span-3"
          label="SAVE & PRINT"
          iconKey="savePrint"
          variant="green"
          onClick={() => window.print()}
        />
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-14 gap-2">
        <ActionButton
          className="col-span-2"
          label="Prev"
          iconKey="prev"
          variant="yellow"
        />
        <ActionButton
          className="col-span-2"
          label="Next"
          iconKey="next"
          variant="yellow"
        />
        <ActionButton
          className="col-span-2"
          label="QTY"
          iconKey="subQty"
          variant="yellow"
          onClick={decrementSelectedQty}
        />
        <ActionButton
          className="col-span-2"
          label="Del Row"
          iconKey="delRow"
          variant="red"
          onClick={deleteSelectedItems}
        />
        <ActionButton
          className="col-span-2"
          label="Report"
          iconKey="report"
          variant="purple"
        />
        <ActionButton
          className="col-span-2"
          label="Cash"
          iconKey="cash"
          variant="purple"
        />
        <ActionButton
          className="col-span-2"
          label="0.00"
          iconKey="cash"
          variant="purple"
        />
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-14 gap-2">
        <ActionButton
          className="col-span-2"
          label="Reprint"
          iconKey="reprint"
          variant="purple"
        />
        <ActionButton
          className="col-span-2"
          label="S Return"
          iconKey="return"
          variant="purple"
        />
        <ActionButton
          className="col-span-2"
          label="Clear"
          iconKey="clear"
          variant="purple"
          onClick={clearOrder}
        />
        <ActionButton
          className="col-span-2"
          label="Price"
          iconKey="price"
          variant="purple"
        />
        <ActionButton
          className="col-span-2"
          label="Accounts"
          iconKey="accounts"
          variant="purple"
        />
        <ActionButton
          className="col-span-2"
          label="Item"
          iconKey="item"
          variant="purple"
        />
        <ActionButton
          className="col-span-2"
          label="Balance 0.000"
          iconKey="balance"
          variant="purple"
        />
      </div>
    </div>
  );
};

export default OrderActions;
