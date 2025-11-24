import { ITEMS } from "../constants/items";

export const createMaterialSlice = (set, get) => ({
  items: [],
  setItems: (items) => set({ items }),

  fetchItems: async () => {
    try {
      //   TODO: replace with real backend API
      // const res = await fetch("http://localhost:5000/api/items");
      // const data = await res.json();

      // For now, mock with ITEMS constant
      set({ items: ITEMS });
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  },
});
