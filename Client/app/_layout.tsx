import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
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
          name="(auth)/login"
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="(auth)/signup"
          options={{
            title: 'Sign Up',
          }}
        />
        {/* Tabs layout — hide stack header only for the tabs screens */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
