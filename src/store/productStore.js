// src/store/productStore.js
import { ITEMS } from "../constants/items";

export const createProductSlice = (set, get) => ({
  addItemByBarcode: (barcode) => {
    const item = ITEMS.find((i) => i.barcode === barcode);
    if (!item) return false;

    get().addItem(item);
    return true;
  },
});
