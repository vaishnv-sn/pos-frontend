// src/store/customerStore.js
export const createCustomerSlice = (set) => ({
  customerDetails: {
    invoiceNo: "4",
    user: "", // Will be populated from logged-in user
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
