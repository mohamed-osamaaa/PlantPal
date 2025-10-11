import React from 'react';

import { useRouter } from 'expo-router';
import {
    Alert,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useAuthStore } from '../../store/useAuthStore';
import styles from '../../styles/settingsStyles';

const LogoutScreen = () => {
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await logout();
                        router.replace("/login");
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Account</Text>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LogoutScreen;
