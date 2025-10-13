import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

import api from '../utils/axiosInstance';

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    register: async (email, password, fcmToken) => {
        try {
            set({ loading: true, error: null });
            const res = await api.post("/users/register", { email, password, fcmToken });
            // console.log("Registration success:", res.data);
            set({ loading: false });
            return { success: true };
        } catch (err) {
            const data = err.response?.data;
            let errorMessage = "Registration failed";
            if (data?.message) {
                errorMessage = Array.isArray(data.message)
                    ? data.message.join("\n")
                    : data.message;
            }
            set({ error: errorMessage, loading: false });
            return { success: false };
        }
    },

    login: async (email, password) => {
        try {
            set({ loading: true, error: null });

            const res = await api.post("/users/login", { email, password });
            const { accessToken, user } = res.data;

            await SecureStore.setItemAsync("token", accessToken);
            set({ user, loading: false });

            // console.log("Login success:", user);
            return { success: true };
        } catch (err) {
            const data = err.response?.data;
            let errorMessage = "Login failed";

            if (data?.message) {
                errorMessage = Array.isArray(data.message)
                    ? data.message.join("\n")
                    : data.message;
            }

            set({ error: errorMessage, loading: false });
            return { success: false };
        }
    },

    logout: async () => {
        await SecureStore.deleteItemAsync("token");
        set({ user: null });
    },
    checkAuth: async () => {
        set({ loading: true, error: null });
        try {
            const token = await SecureStore.getItemAsync("token");
            if (!token) {
                set({ user: null, loading: false });
                return { valid: false };
            }

            const res = await api.get("/users/check-auth");
            if (res.data?.valid) {
                set({ user: res.data.user, loading: false });
                return { valid: true, user: res.data.user };
            } else {
                await SecureStore.deleteItemAsync("token");
                set({ user: null, loading: false });
                return { valid: false };
            }
        } catch (err) {
            await SecureStore.deleteItemAsync("token");
            set({ user: null, loading: false });
            return { valid: false };
        }
    },
}));
