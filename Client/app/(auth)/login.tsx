import React, { useState } from 'react';

import { Link } from 'expo-router';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import styles from './login.styles';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={[styles.title, { flex: 1, textAlign: "center" }]}>Login</Text>
            </View>

            <View style={styles.main}>
                <View style={styles.form}>
                    <Text style={styles.smallText}>Email or Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="you@example.com"
                        placeholderTextColor="#6b7280"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.smallText}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#6b7280"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.footerText}>
                        <Text style={styles.smallText}>
                            Don’t have an account?{" "}
                            <Link href={"/signup"} style={styles.link}>Sign Up</Link>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login;
