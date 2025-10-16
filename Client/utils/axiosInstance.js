import axios from 'axios';
// import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    // baseURL: process.env.EXPO_PUBLIC_API_URL,
    baseURL: 'https://plant-p5jlths1b-mohamed-osamas-projects-4ae2933e.vercel.app',
});

api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('token');

        // try {
        //     const { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status === 'granted') {
        //         const location = await Location.getCurrentPositionAsync({});
        //         config.headers['X-Coordinates'] = `${location.coords.latitude},${location.coords.longitude}`;
        //     }
        // } catch (err) {
        //     console.warn("Location not available:", err.message);
        // }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
