import React from 'react';

import { useLocalSearchParams } from 'expo-router';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { getRelativeTime } from '@/utils/getRelativeTime';

import { usePlantStore } from '../../store/usePlantStore';
import styles from '../../styles/plantDetailsStyles';

export default function PlantDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { plants, loading, markWatered } = usePlantStore();

    const plant = plants.find((p) => p._id === id);

    if (loading || !plant) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#17cf17" />
            </View>
        );
    }

    const nextWatering = plant.nextWatering ? new Date(plant.nextWatering) : null;
    const now = new Date();
    const diffDays = nextWatering
        ? Math.ceil((nextWatering.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    let wateringText = 'N/A';
    if (diffDays !== null) {
        if (diffDays <= 0) wateringText = 'Today';
        else if (diffDays === 1 || diffDays <= 2) wateringText = 'Tomorrow';
        else wateringText = `In ${diffDays} days`;
    }

    const handleMarkWatered = async () => {
        await markWatered(plant._id);
    };

    return (
        <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={
                        plant.image
                            ? { uri: `${process.env.EXPO_PUBLIC_API_URL}${plant.image}` }
                            : require('../../assets/images/welcomeImg.png')
                    }
                    style={styles.plantImage}
                />

                <View style={styles.container}>
                    <Text style={styles.name}>{plant.name}</Text>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Watering Schedule</Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Frequency</Text>
                            <Text style={styles.infoValue}>
                                {plant.wateringSchedule}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Last Watered</Text>
                            <Text style={styles.infoValue}>
                                {plant.lastWatered
                                    ? getRelativeTime(plant.lastWatered)
                                    : 'Not watered yet'}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Next Watering</Text>
                            <Text style={[styles.infoValue, styles.highlight]}>
                                {wateringText}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.wateredBtn}
                        onPress={handleMarkWatered}
                    >
                        <Text style={styles.wateredText}>Just Watered</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
