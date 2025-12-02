import instance from "../lib/axios";

export const createMaterialSlice = (set, get) => ({
  items: [],
  itemsPage: 1,
  itemsHasMore: true,
  loadingItems: false,

  modalItems: [],
  modalItemsPagination: null, // ⭐ Add this
  modalItemsPage: 1,
  modalItemsHasMore: true,
  loadingModalItems: false,

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
  searchItems: async (query) => {
    set({ loadingItems: true });
    try {
      const res = await instance.get(
        `/material?page=1&limit=20&search=${query}`
      );
      set({
        items: res.data.data,
        itemsPage: 2,
        itemsHasMore: res.data.pagination.totalPages > 1,
      });
    } catch (err) {
      console.error("Failed to search items:", err);
    } finally {
      set({ loadingItems: false });
    }
  },

  fetchModalItems: async (page = 1) => {
    const { loadingModalItems } = get();
    const selectedCategory = get().selectedCategory;

    if (loadingModalItems) return;

    const categoryId = selectedCategory?._id ? selectedCategory._id : "";

    set({ loadingModalItems: true });

    try {
      const res = await instance.get(
        `/material?page=${page}&limit=8${
          categoryId ? `&category=${categoryId}` : ""
        }`
      );

      set({
        modalItems: res.data.data,
        modalItemsPagination: res.data.pagination, // ⭐ Store full pagination info
      });
    } catch (err) {
      console.error("Failed to fetch modal items:", err);
    } finally {
      set({ loadingModalItems: false });
    }
  },

  searchModalItems: async (query, page = 1) => {
    set({ loadingModalItems: true });
    try {
      const res = await instance.get(
        `/material?page=${page}&limit=8&search=${query}` // ⭐ Changed limit to 8
      );
      set({
        modalItems: res.data.data,
        modalItemsPagination: res.data.pagination, // ⭐ Store pagination
      });
    } catch (err) {
      console.error("Failed to search modal items:", err);
    } finally {
      set({ loadingModalItems: false });
    }
  },
});
