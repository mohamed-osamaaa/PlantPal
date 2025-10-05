import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  const styles = StyleSheet.create({
    fontDisplay: {
      fontFamily: 'Lexend',
    },
  });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}