// src/store/customerStore.js
export const createCustomerSlice = (set) => ({
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
});
