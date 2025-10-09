import React, { useState } from 'react';

import {
    Link,
    useRouter,
} from 'expo-router';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useAuthStore } from '@/store/useAuthStore';
import { loginSchema } from '@/validators/authValidators';

import styles from '../../styles/login.styles';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState<Record<string, string | null>>({});

    const login = useAuthStore((state: any) => state.login);
    const loading = useAuthStore((state: any) => state.loading);
    const error = useAuthStore((state: any) => state.error);

    const router = useRouter();

    const handleLogin = async () => {
        const payload = { email, password };
        const result = loginSchema.safeParse(payload);

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

        const { success } = await login(email, password);
        if (success) {
            router.push("/home/home");
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={[styles.title, { textAlign: "center" }]}>Login</Text>
            </View>

            <View style={styles.main}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={(t) => {
                            setEmail(t);
                            setFormErrors((prev) => ({ ...prev, email: null }));
                        }}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    {formErrors.email && (
                        <Text style={styles.errorText}>{formErrors.email}</Text>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        secureTextEntry
                        value={password}
                        onChangeText={(t) => {
                            setPassword(t);
                            setFormErrors((prev) => ({ ...prev, password: null }));
                        }}
                    />
                    {formErrors.password && (
                        <Text style={styles.errorText}>{formErrors.password}</Text>
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Loading..." : "Login"}
                        </Text>
                    </TouchableOpacity>

                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>

                <View style={styles.footerText}>
                    <Text style={styles.smallText}>
                        Don’t have an account?{" "}
                        <Link href="/signup" style={styles.link}>
                            Sign Up
                        </Link>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login;
