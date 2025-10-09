import React from 'react';

import {
    Text,
    View,
} from 'react-native';

import { useAuthStore } from '../../store/useAuthStore';

const Home = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome Home 👋</Text>
            {user && <Text>Email: {user.email}</Text>}
        </View>
    );
};

export default Home;
