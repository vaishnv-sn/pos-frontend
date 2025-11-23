// src/store/summaryStore.js
export const createSummarySlice = (set) => ({
  discount: 0,
  adjustment: 0,

  setDiscount: (discount) => set({ discount }),
  setAdjustment: (adjustment) => set({ adjustment }),
});
