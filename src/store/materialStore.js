import { ITEMS } from "../constants/items";
import instance from "../lib/axios";

export const createMaterialSlice = (set, get) => ({
  items: [],
  loadingItems: false,
  setItems: (items) => set({ items }),

  fetchItems: async () => {
    try {
      set({ loadingItems: true });

      // ✔ Real API call
      const res = await instance.get("/material");

      // API structure should be: { success: true, data: [...] }
      set({ items: res.data.data });
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      set({ loadingItems: false });
    }
  },
});
