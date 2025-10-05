import React from 'react';

import { Link } from 'expo-router';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './signup.styles';

const Signup = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            <View style={styles.main}>
                <View style={styles.iconCircle}>
                    <Ionicons name="checkmark-done-outline" size={56} color="#17cf17" />
                </View>
                <Text style={styles.title}>Create your account</Text>
                <Text style={styles.subtitle}>Join us and keep your plants happy!</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9ca3af"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9ca3af"
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#9ca3af"
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerText}>
                    <Text style={styles.smallText}>
                        Already have an account?{" "}
                        <Link href={"/login"} style={styles.link}>Log In</Link>
                    </Text>
                </View>
            </View>

        </ScrollView>
    );
};

export default Signup;