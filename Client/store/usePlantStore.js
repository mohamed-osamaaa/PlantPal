import { create } from 'zustand';

import api from '../utils/axiosInstance';

export const usePlantStore = create((set) => ({
    plants: [],
    loading: false,
    error: null,

    fetchPlants: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.get("/plants");
            set({ plants: res.data.plants, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to fetch plants",
                loading: false,
            });
        }
    },

    addPlant: async (formData) => {
        try {
            set({ loading: true, error: null });

            const headers = {};
            if (formData.get('image')) {
                headers['Content-Type'] = 'multipart/form-data';
            }

            const res = await api.post("/plants", formData, { headers });

            set((state) => ({
                plants: [...state.plants, res.data.plant],
                loading: false,
            }));

            return { success: true };
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to create plant",
                loading: false,
            });
            return { success: false };
        }
    }
}));
