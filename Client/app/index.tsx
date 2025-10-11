import React from 'react';

import { useRouter } from 'expo-router';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import styles from '../styles/styles';

const welcomeImg = require("../assets/images/welcomeImg.png");

const WelcomeScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: isDark ? "#112111" : "#f6f8f6" },
            ]}
        >
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image source={welcomeImg} style={styles.image} />
                </View>
                <Text style={[styles.title, { color: isDark ? "#e3fde3" : "#111811" }]}>
                    Welcome to PlantPal
                </Text>
                <Text
                    style={[
                        styles.subtitle,
                        { color: isDark ? "rgba(227,253,227,0.8)" : "rgba(17,24,17,0.8)" },
                    ]}
                >
                    Manage your plants and get watering reminders.
                </Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: "#17cf17" }]}
                    onPress={() => router.push("/(auth)/signup")}
                >
                    <Text style={styles.primaryText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.secondaryButton,
                        { backgroundColor: isDark ? "#1a3a1a" : "#d8f8d8" },
                    ]}
                    onPress={() => router.push("/(auth)/login")}
                >
                    <Text
                        style={[
                            styles.secondaryText,
                            { color: isDark ? "#e3fde3" : "#111811" },
                        ]}
                    >
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WelcomeScreen;
