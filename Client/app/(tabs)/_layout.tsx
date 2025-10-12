import { Tabs } from 'expo-router';

import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#17cf17',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    backgroundColor: '#f6f8f6',
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(23, 207, 23, 0.2)',
                    paddingTop: 6,
                    paddingBottom: 8,
                    height: 70,
                },
                tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
            }}
        >
            <Tabs.Screen
                name="myPlants"
                options={{
                    title: 'My Plants',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="local-florist" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="addPlant"
                options={{
                    title: 'Add Plant',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="add-circle" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    headerTitle: "Settings",
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: '700',
                        letterSpacing: 0.5,
                    },
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="settings" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
