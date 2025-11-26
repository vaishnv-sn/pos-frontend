import instance from "../lib/axios";

export const createCategorySlice = (set, get) => ({
  categories: [],
  categoriesPage: 1,
  categoriesHasMore: true,
  loadingCategories: false,
  selectedCategory: { name: "All Items", _id: null },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setCategories: (categories) => set({ categories }),

  fetchCategories: async (reset = false) => {
    const { categoriesPage, categoriesHasMore, loadingCategories, categories } =
      get();

    // Don't fetch if already loading or no more data (unless resetting)
    if (loadingCategories || (!reset && !categoriesHasMore)) return;

    set({ loadingCategories: true });

    try {
      const page = reset ? 1 : categoriesPage;
      const res = await instance.get(`/category?page=${page}&limit=20`);

      const newCategories = res.data.data;
      const { hasMore } = res.data.pagination;

      set({
        categories: reset ? newCategories : [...categories, ...newCategories],
        categoriesPage: page + 1,
        categoriesHasMore: hasMore,
        loadingCategories: false,
      });
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      set({ loadingCategories: false });
    }
  },

  searchCategories: async (searchTerm) => {
    set({ loadingCategories: true });

    try {
      const res = await instance.get(`/category?search=${searchTerm}&limit=20`);

      set({
        categories: res.data.data,
        categoriesPage: 2,
        categoriesHasMore: res.data.pagination.hasMore,
        loadingCategories: false,
      });
    } catch (err) {
      console.error("Failed to search categories:", err);
      set({ loadingCategories: false });
    }
  },

  resetCategories: () => {
    set({
      categories: [],
      categoriesPage: 1,
      categoriesHasMore: true,
      loadingCategories: false,
    });
  },
});
