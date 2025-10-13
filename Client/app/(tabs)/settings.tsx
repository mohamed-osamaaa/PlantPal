import React, {
    useEffect,
    useState,
} from 'react';

import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
    Alert,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '../../store/useAuthStore';
import { usePlantStore } from '../../store/usePlantStore';
import styles from '../../styles/settingsStyles';

const SettingsScreen: React.FC = () => {
    const [remindersEnabled, setRemindersEnabled] = useState<boolean>(true);
    const [value, setValue] = useState<number | null>(7);

    const router = useRouter();
    const { logout } = useAuthStore();
    const { updateReminderSettings } = usePlantStore();

    const REMINDER_ENABLED_KEY = 'remindersEnabled';
    const REMINDER_HOUR_KEY = 'reminderHour';

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedEnabled = await SecureStore.getItemAsync(REMINDER_ENABLED_KEY);
                const savedHour = await SecureStore.getItemAsync(REMINDER_HOUR_KEY);

                if (savedEnabled !== null) setRemindersEnabled(savedEnabled === 'true');
                if (savedHour !== null) setValue(Number(savedHour));
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };
        loadSettings();
    }, []);

    const handleToggleReminders = async (newValue: boolean) => {
        setRemindersEnabled(newValue);
        try {
            await SecureStore.setItemAsync(REMINDER_ENABLED_KEY, String(newValue));
            await updateReminderSettings(newValue, value || 7);
        } catch (error) {
            console.error('Error saving reminder state:', error);
        }
    };

    const handleChangeHour = async (newHour: number) => {
        setValue(newHour);
        try {
            await SecureStore.setItemAsync(REMINDER_HOUR_KEY, String(newHour));
            await updateReminderSettings(remindersEnabled, newHour);
        } catch (error) {
            console.error('Error saving reminder hour:', error);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/login');
                    },
                },
            ]
        );
    };

    const data = Array.from({ length: 24 }, (_, i) => ({
        label: `${i + 1}:00`,
        value: i + 1,
    }));

    return (
        <View style={styles.container}>
            {/* Notifications Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>

                <View style={styles.card}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>Watering Reminders</Text>
                        <Text style={styles.cardSubtitle}>
                            Receive reminders to water your plants
                        </Text>
                    </View>
                    <Switch
                        value={remindersEnabled}
                        onValueChange={handleToggleReminders}
                        trackColor={{
                            false: '#c7eac7',
                            true: '#17cf17',
                        }}
                        thumbColor="#fff"
                    />
                </View>

                <View style={[styles.card, styles.dropdownCard]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>Reminder Time</Text>
                        <Text style={styles.cardSubtitle}>
                            Set the time for your watering reminders
                        </Text>
                    </View>

                    <View style={styles.dropdownWrapper}>
                        <Dropdown
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Select time"
                            value={value}
                            onChange={(item) => handleChangeHour(item.value)}
                            style={{
                                borderWidth: 1,
                                borderColor: '#17cf17',
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                height: 45,
                                minWidth: 120,
                            }}
                            containerStyle={{
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: '#17cf17',
                            }}
                            selectedTextStyle={{
                                color: '#111811',
                            }}
                            itemTextStyle={{
                                color: '#111811',
                            }}
                        />
                    </View>
                </View>
            </View>

            {/* Account Section */}
            <View style={[styles.section, { marginTop: hp(3) }]}>
                <Text style={styles.sectionTitle}>Account</Text>

                <TouchableOpacity style={styles.card} onPress={handleLogout}>
                    <Text style={styles.cardTitle}>Log Out</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={hp(2.5)}
                        color="rgba(17,24,17,0.5)"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;
