import React, { useEffect } from 'react';

import { router } from 'expo-router';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { usePlantStore } from '../../store/usePlantStore';
import styles from '../../styles/myPlantsStyles';

export default function MyPlantsScreen() {
    const { plants, loading, fetchPlants } = usePlantStore();

    useEffect(() => {
        fetchPlants();
    }, [fetchPlants]);

    const renderPlant = ({ item }: any) => {
        const nextWatering = new Date(item.nextWatering);
        const now = new Date();
        const diffDays = Math.ceil(
            (nextWatering.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        let wateringText = "Watering: Today";
        if (diffDays > 0) wateringText = `Watering: in ${diffDays} days`;
        if (diffDays === 1) wateringText = `Watering: Tomorrow`;

        return (
            <View style={styles.plantCard}>
                <Image
                    source={
                        item.image
                            ? { uri: `${process.env.EXPO_PUBLIC_API_URL}${item.image}` }
                            : require("../../assets/images/welcomeImg.png")
                    }
                    style={styles.plantImage}
                />
                <View style={styles.plantInfo}>
                    <Text style={styles.plantName}>{item.name}</Text>
                    <Text style={styles.wateringText}>{wateringText}</Text>
                </View>
                <MaterialIcons name="water-drop" size={28} color="#17cf17" />
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ width: 40 }} />
                <Text style={styles.headerTitle}>My Plants</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/(tabs)/addPlant')}
                >
                    <MaterialIcons name="add" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Plant list */}
            {loading ? (
                <ActivityIndicator size="large" color="#17cf17" style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={plants}
                    keyExtractor={(item) => item._id}
                    renderItem={renderPlant}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}
