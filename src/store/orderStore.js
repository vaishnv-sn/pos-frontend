export const createOrderSlice = (set, get) => ({
  orderItems: [],
  discountAmount: 0,
  discountType: "PERCENT", // "PERCENT" or "FIXED"
  adjustment: 0,

  setDiscountAmount: (amount) => set({ discountAmount: amount }),
  setDiscountType: (type) => set({ discountType: type }),
  setAdjustment: (adj) => set({ adjustment: adj }),

  addItem: (item) => {
    const { orderItems } = get();
    const itemId = item._id;
    const retailRate = Number(item.retailRate) || 0;

    const existingItem = orderItems.find((i) => i._id === itemId);

    if (existingItem) {
      set({
        orderItems: orderItems.map((i) =>
          i._id === itemId
            ? {
                ...i,
                qty: i.qty + 1,
                amount: (i.qty + 1) * retailRate,
              }
            : i
        ),
      });
      return;
    }

    set({
      orderItems: [
        ...orderItems,
        {
          ...item,
          _id: itemId,
          qty: 1,
          unit: item.unitPrimary,
          retailRate: retailRate,
          amount: retailRate,
          checked: false,
          // Include tax properties for proper calculation
          taxRate: Number(item.taxRate) || 0,
          retailRateIncludeTax: item.retailRateIncludeTax ?? true,
        },
      ],
    });
  },

  updateItemQty: (id, qty) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) => {
        if (item._id !== id) return item;

        const newQty = Number(qty) || 1;
        return {
          ...item,
          qty: newQty,
          amount: newQty * (Number(item.retailRate) || 0),
        };
      }),
    })),

  updateItemPrice: (id, price) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) => {
        if (item._id !== id) return item;

        const newPrice = Number(price) || 0;
        return {
          ...item,
          retailRate: newPrice,
          amount: item.qty * newPrice,
        };
      }),
    })),

  updateItemUnit: (id, unit) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item._id === id ? { ...item, unit } : item
      ),
    })),

  toggleItemCheck: (id) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      ),
    })),

  toggleAllItems: () =>
    set((state) => {
      const allChecked = state.orderItems.every((item) => item.checked);
      return {
        orderItems: state.orderItems.map((item) => ({
          ...item,
          checked: !allChecked,
        })),
      };
    }),

  deleteSelectedItems: () =>
    set((state) => ({
      orderItems: state.orderItems.filter((item) => !item.checked),
    })),

  incrementSelectedQty: () =>
    set((state) => ({
      orderItems: state.orderItems.map((item) => {
        if (!item.checked) return item;

        const newQty = item.qty + 1;
        return {
          ...item,
          qty: newQty,
          amount: newQty * (Number(item.retailRate) || 0),
        };
      }),
    })),

  decrementSelectedQty: () =>
    set((state) => ({
      orderItems: state.orderItems.map((item) => {
        if (!item.checked || item.qty <= 1) return item;

        const newQty = item.qty - 1;
        return {
          ...item,
          qty: newQty,
          amount: newQty * (Number(item.retailRate) || 0),
        };
      }),
    })),

  clearOrder: () =>
    set({
      orderItems: [],
      discountAmount: 0,
      discountType: "PERCENT",
      adjustment: 0,
    }),
});
