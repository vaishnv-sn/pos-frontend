import instance from "../lib/axios";

export const createMetaSlice = (set, get) => ({
  units: [],

  fetchUnits: async () => {
    try {
      const res = await instance.get("/meta/units");

      set({ units: res.data.data });
    } catch (err) {
      console.error("Failed to fetch units:", err);
    }
  },

  warehouses: [],

  fetchWarehouses: async () => {
    try {
      const res = await instance.get("/meta/warehouses");

      set({ warehouses: res.data.data });
    } catch (err) {
      console.error("Failed to fetch warehouses:", err);
    }
  },

  taxes: [],

  fetchTaxes: async () => {
    try {
      const res = await instance.get("/meta/taxes");

      set({ taxes: res.data.data });
    } catch (err) {
      console.error("Failed to fetch taxes:", err);
    }
  },
});
