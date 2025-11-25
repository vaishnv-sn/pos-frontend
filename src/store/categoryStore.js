import instance from "../lib/axios";

export const createCategorySlice = (set, get) => ({
  categories: [],
  loadingCategories: false,
  selectedCategory: { name: "All Items", _id: null },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setCategories: (categories) => set({ categories }),

  // For now: mock fetch
  fetchCategories: async () => {
    try {
      set({ loadingCategories: true });

      const res = await instance.get("/category");

      set({ categories: res.data.data });
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      set({ loadingCategories: false });
    }
  },
});
