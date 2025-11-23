import { CATEGORIES } from "../constants/categories";

export const createCategorySlice = (set, get) => ({
  categories: [],
  selectedCategory: "All Items",

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setCategories: (categories) => set({ categories }),

  // For now: mock fetch
  fetchCategories: () => set({ categories: CATEGORIES }),
});
