import React, { useState } from 'react';

import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { registerForPushNotificationsAsync } from '../../utils/notifications';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '../../store/useAuthStore';
import styles from '../../styles/signup.styles';
import { registerSchema } from '../../validators/authValidators';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>({});

    const register = useAuthStore((state: any) => state.register);
    const loading = useAuthStore((state: any) => state.loading);
    const error = useAuthStore((state: any) => state.error);

    const router = useRouter();



    const handleSignUp = async () => {
        // validate with zod
        const payload = { email, password, confirmPassword };
        const result = registerSchema.safeParse(payload);

        if (!result.success) {
            const errors: Record<string, string | null> = {};
            result.error.errors.forEach((err) => {
                const key = err.path[0] ?? "_";
                errors[key] = err.message;
            });
            setFormErrors(errors);
            return;
        }

        setFormErrors({});

        let fcmToken: string | null = null;
        try {
            const token = await registerForPushNotificationsAsync();
            fcmToken = token ?? null;
            if (fcmToken) {
                await SecureStore.setItemAsync('fcmToken', fcmToken);
            }
        } catch (err) {
            console.warn("🚨 Failed to get FCM token:", err);
        }

        const { success } = await register(email, password, fcmToken);
        if (success) {
            router.push("/(auth)/login");
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.main}>
                <View style={styles.iconCircle}>
                    <Ionicons name="checkmark-done-outline" size={56} color="#17cf17" />
                </View>
                <Text style={styles.title}>Create your account</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="mohamed@gmail.com"
                        value={email}
                        onChangeText={(text) => { setEmail(text); setFormErrors(prev => ({ ...prev, email: null })); }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••••••••"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => { setPassword(text); setFormErrors(prev => ({ ...prev, password: null })); }}
                    />
                    {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••••••••"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => { setConfirmPassword(text); setFormErrors(prev => ({ ...prev, confirmPassword: null })); }}
                    />
                    {formErrors.confirmPassword && <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignUp}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign Up"}</Text>
                    </TouchableOpacity>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <View style={styles.footerText}>
                        <Text style={styles.smallText}>
                            Already have an account?{" "}
                            <Text
                                style={styles.link}
                                onPress={() => router.push("/(auth)/login")}
                            >
                                Log In
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Signup;
