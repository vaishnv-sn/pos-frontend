// src/store/orderStore.js
export const createOrderSlice = (set, get) => ({
  orderItems: [],

  addItem: (item) => {
    const { orderItems } = get();
    const existingItem = orderItems.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        orderItems: orderItems.map((i) =>
          i.id === item.id
            ? { ...i, qty: i.qty + 1, amount: (i.qty + 1) * i.price }
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

  updateItemQty: (id, qty) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id
          ? { ...item, qty: Number(qty), amount: Number(qty) * item.price }
          : item
      ),
    })),

  updateItemPrice: (id, price) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id
          ? { ...item, price: Number(price), amount: item.qty * Number(price) }
          : item
      ),
    })),

  updateItemUnit: (id, unit) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id ? { ...item, unit } : item
      ),
    })),

  toggleItemCheck: (id) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    })),

  deleteSelectedItems: () =>
    set((state) => ({
      orderItems: state.orderItems.filter((item) => !item.checked),
    })),

  incrementSelectedQty: () =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.checked
          ? { ...item, qty: item.qty + 1, amount: (item.qty + 1) * item.price }
          : item
      ),
    })),

  decrementSelectedQty: () =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.checked && item.qty > 1
          ? { ...item, qty: item.qty - 1, amount: (item.qty - 1) * item.price }
          : item
      ),
    })),

  clearOrder: () => set({ orderItems: [] }),
});
