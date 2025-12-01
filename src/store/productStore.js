import instance from "../lib/axios";

export const createProductSlice = (set, get) => ({
  barcodeLoading: false,
  barcodeError: null,

  addItemByBarcode: async (barcode) => {
    if (!barcode || barcode.trim() === "")
      return { success: false, error: "Barcode is required" };

    set({ barcodeLoading: true, barcodeError: null });

    try {
      const response = await instance.get(`/material/barcode/${barcode}`);
      const item = response.data.data;

      get().addItem(item);
      set({ barcodeLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.status === 404
          ? "Item not found"
          : "Failed to fetch item";

      set({ barcodeLoading: false, barcodeError: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
});
