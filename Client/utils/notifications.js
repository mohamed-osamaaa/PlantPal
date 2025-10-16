import {
    Alert,
    Platform,
} from 'react-native';

import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

async function requestIOSPermission() {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= 1) {
        console.log('iOS Permission granted:', settings);
        return true;
    } else {
        Alert.alert('Notifications permission denied on iOS');
        return false;
    }
}

async function setupNotificationChannel() {
    if (Platform.OS === 'android') {
        await notifee.createChannel({
            channelId: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lights: ['#17cf17', 1000, 500],
        });
    }
}

export async function registerForPushNotificationsAsync() {
    try {
        if (Platform.OS === 'ios') {
            const iosPermissionGranted = await requestIOSPermission();
            if (!iosPermissionGranted) return null;
        }

        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
            Alert.alert('Notifications permission not granted');
            return null;
        }

        await setupNotificationChannel();

        const fcmToken = await messaging().getToken();
        console.log('🔥 FCM Token:', fcmToken);

        return fcmToken;
    } catch (error) {
        console.error('Error registering for notifications:', error);
        return null;
    }
}