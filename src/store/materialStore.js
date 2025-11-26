import { ITEMS } from "../constants/items";
import instance from "../lib/axios";

export const createMaterialSlice = (set, get) => ({
  items: [],
  itemsPage: 1,
  itemsHasMore: true,
  loadingItems: false,

  fetchItems: async (reset = false) => {
    const { itemsPage, itemsHasMore, loadingItems, items } = get();
    const selectedCategory = get().selectedCategory;

    if (loadingItems || (!reset && !itemsHasMore)) return;

    const page = reset ? 1 : itemsPage;
    const categoryId = selectedCategory?._id ? selectedCategory._id : "";

    set({ loadingItems: true });

    try {
      const res = await instance.get(
        `/material?page=${page}&limit=20${
          categoryId ? `&category=${categoryId}` : ""
        }`
      );

      const newItems = res.data.data;
      const totalPages = res.data.pagination.totalPages;

      set({
        items: reset ? newItems : [...items, ...newItems],
        itemsPage: page + 1,
        itemsHasMore: page < totalPages,
      });
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      set({ loadingItems: false });
    }
  },
});
