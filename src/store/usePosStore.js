// src/store/usePosStore.js
import { create } from "zustand";

import { createCategorySlice } from "./categoryStore";
import { createOrderSlice } from "./orderStore";
import { createCustomerSlice } from "./customerStore";
import { createSummarySlice } from "./summaryStore";
import { createProductSlice } from "./productStore";

const usePosStore = create((set, get) => ({
  ...createCategorySlice(set, get),
  ...createOrderSlice(set, get),
  ...createCustomerSlice(set, get),
  ...createSummarySlice(set, get),
  ...createProductSlice(set, get),
}));

export default usePosStore;
