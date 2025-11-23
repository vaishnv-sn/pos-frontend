import { create } from "zustand";
import { ITEMS } from "../constants/items";
import { CATEGORIES } from "../constants/categories";

const usePosStore = create((set, get) => ({
  // Category State
  // --------------------------------
  categories: [],

  selectedCategory: "All Items",

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setCategories: (categories) => set({ categories }),

  // fetchCategories: async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/categories");
  //     const data = await res.json();
  //     set({ categories: data });
  //   } catch (err) {
  //     console.error("Failed to fetch categories", err);
  //   }
  // },

  fetchCategories: () => set({ categories: CATEGORIES }),
  // --------------------------------

  // Order State
  orderItems: [],
  addItem: (item) => {
    const { orderItems } = get();
    const existingItem = orderItems.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        orderItems: orderItems.map((i) =>
          i.id === item.id
            ? {
                ...i,
                qty: i.qty + 1,
                amount: (i.qty + 1) * i.price,
              }
            : i
        ),
      });
    } else {
      set({
        orderItems: [
          ...orderItems,
          {
            ...item,
            qty: 1,
            unit: "Box",
            amount: item.price,
            checked: false,
          },
        ],
      });
    }
  },
  updateItemQty: (id, qty) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id
          ? { ...item, qty: Number(qty), amount: Number(qty) * item.price }
          : item
      ),
    }));
  },
  updateItemPrice: (id, price) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id
          ? { ...item, price: Number(price), amount: item.qty * Number(price) }
          : item
      ),
    }));
  },
  updateItemUnit: (id, unit) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id ? { ...item, unit } : item
      ),
    }));
  },
  toggleItemCheck: (id) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      orderItems: state.orderItems.filter((item) => item.id !== id),
    }));
  },
  deleteSelectedItems: () => {
    set((state) => ({
      orderItems: state.orderItems.filter((item) => !item.checked),
    }));
  },
  incrementSelectedQty: () => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.checked
          ? { ...item, qty: item.qty + 1, amount: (item.qty + 1) * item.price }
          : item
      ),
    }));
  },
  decrementSelectedQty: () => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.checked && item.qty > 1
          ? { ...item, qty: item.qty - 1, amount: (item.qty - 1) * item.price }
          : item
      ),
    }));
  },
  clearOrder: () => set({ orderItems: [] }),

  // Customer State
  customerDetails: {
    invoiceNo: "4",
    user: "7034753806",
    date: new Date().toLocaleDateString("en-GB"),
    customerName: "",
    paymentMethod: "Cash",
    phone: "",
    barCode: "",
    item: "",
  },
  updateCustomerDetails: (details) =>
    set((state) => ({
      customerDetails: { ...state.customerDetails, ...details },
    })),

  // Summary State
  discount: 0,
  adjustment: 0,
  setDiscount: (discount) => set({ discount }),
  setAdjustment: (adjustment) => set({ adjustment }),

  // Barcode Action
  addItemByBarcode: (barcode) => {
    const item = ITEMS.find((i) => i.barcode === barcode);
    if (item) {
      get().addItem(item);
      return true;
    }
    return false;
  },
}));

export default usePosStore;
