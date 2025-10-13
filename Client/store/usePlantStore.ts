import { create } from 'zustand';

import api from '../utils/axiosInstance';

export interface IPlant {
    _id: string;
    name: string;
    image?: string;
    wateringSchedule: string;
    lastWatered?: string | null;
    nextWatering: string | null;
}

interface PlantState {
    plants: IPlant[];
    loading: boolean;
    error: string | null;
    fetchPlants: () => Promise<void>;
    addPlant: (payload: FormData | { name: string; wateringSchedule: string }) => Promise<{ success: boolean }>;
    markWatered: (plantId: string) => Promise<{ success: boolean }>;
    updateReminderSettings: (enabled: boolean, hour: number) => Promise<any>;
}

export const usePlantStore = create<PlantState>((set) => ({
    plants: [],
    loading: false,
    error: null,

    fetchPlants: async () => {
        try {
            set({ loading: true, error: null });
            const res = await api.get("/plants");
            set({ plants: res.data.plants, loading: false });
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to fetch plants",
                loading: false,
            });
        }
    },

    // Accept either FormData (when uploading image) or a plain object { name, wateringSchedule }
    addPlant: async (payload: FormData | { name: string; wateringSchedule: string }) => {
        try {
            set({ loading: true, error: null });

            let res;

            if (typeof FormData !== 'undefined' && payload instanceof FormData) {
                res = await api.post('/plants', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                res = await api.post('/plants', payload);
            }

            set((state) => ({
                plants: [...state.plants, res.data.plant],
                loading: false,
            }));

            return { success: true };
        } catch (err: any) {
            set({
                error: err.response?.data?.message || 'Failed to create plant',
                loading: false,
            });
            return { success: false };
        }
    },

    markWatered: async (plantId) => {
        try {
            set({ loading: true, error: null });
            const res = await api.patch(`/plants/${plantId}/water`);
            set((state) => ({
                plants: state.plants.map((p) =>
                    p._id === plantId ? res.data.plant : p
                ),
                loading: false,
            }));
            return { success: true };
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to mark as watered",
                loading: false,
            });
            return { success: false };
        }
    },

    updateReminderSettings: async (enabled: boolean, hour: number) => {
        try {
            const res = await api.patch('/users/reminder-settings', {
                reminderEnabled: enabled,
                reminderHour: hour,
            });
            return res.data;
        } catch (error: any) {
            console.error('Failed to update reminder settings:', error.response?.data || error.message);
            throw error;
        }
    },
}));
