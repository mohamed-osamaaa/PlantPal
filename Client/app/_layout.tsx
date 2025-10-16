import 'react-native-reanimated';

import { useEffect } from 'react';

import {
  Stack,
  useRouter,
} from 'expo-router';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/store/useAuthStore';

export default function RootLayout() {
  const router = useRouter();
  const { loading, checkAuth } = useAuthStore();

  const initAuth = async () => {
    const result = await checkAuth();
    if (result.valid) {
      router.replace('/(tabs)/addPlant');
    } else {
      router.replace('/');
    }
  };
  useEffect(() => {
    initAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#17cf17" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f8f6" }}>
      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Lexend',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        {/* Tabs layout — hide stack header only for the tabs screens */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="plantDetails/[id]"
          options={{
            title: 'Plant Details',
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
