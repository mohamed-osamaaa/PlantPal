import React, { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import {
    Controller,
    useForm,
} from 'react-hook-form';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';

import { usePlantStore } from '../../store/usePlantStore';
import styles from '../../styles/AddPlantStyles';
import { plantSchema } from '../../validators/plantSchema';

type PlantFormData = z.infer<typeof plantSchema>;

interface PickedImage {
    uri: string;
    type?: string;
    name?: string;
}

const AddPlantScreen: React.FC = () => {
    const { addPlant, loading } = usePlantStore();
    const [image, setImage] = useState<PickedImage | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PlantFormData>({
        resolver: zodResolver(plantSchema),
        defaultValues: {
            name: '',
            wateringSchedule: 'daily',
        },
    });

    const pickImage = async (): Promise<void> => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const selected = result.assets[0];
            const uriParts = selected.uri.split('.');
            const fileType = uriParts[uriParts.length - 1];
            setImage({
                uri: selected.uri,
                type: `image/${fileType === 'heic' ? 'jpeg' : fileType}`, // HEIC → JPEG
                name: `plant.${fileType === 'heic' ? 'jpg' : fileType}`,
            });
        }
    };

    const onSubmit = async (data: PlantFormData): Promise<void> => {
        try {
            let res;
            if (image) {
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('wateringSchedule', data.wateringSchedule);
                formData.append('image', {
                    uri: image.uri,
                    name: image.name || 'plant.jpg',
                    type: image.type || 'image/jpeg',
                } as any);

                res = await addPlant(formData);
            } else {
                // No image selected: send JSON payload
                res = await addPlant({ name: data.name, wateringSchedule: data.wateringSchedule });
            }
            if (res.success) {
                Alert.alert('Success', 'Plant added successfully!');
            } else {
                Alert.alert('Error', 'Failed to add plant');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Plant</Text>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {image ? (
                    <Image source={{ uri: image.uri }} style={styles.image} />
                ) : (
                    <Text style={styles.imagePlaceholder}>+ Upload Image</Text>
                )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Plant Name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Monstera Deliciosa"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.name && (
                    <Text style={styles.errorText}>{errors.name.message}</Text>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Watering Schedule</Text>
                <Controller
                    control={control}
                    name="wateringSchedule"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select schedule..." value="" />
                                <Picker.Item label="Daily" value="daily" />
                                <Picker.Item label="Weekly" value="weekly" />
                                <Picker.Item label="Bi-weekly" value="bi-weekly" />
                                <Picker.Item label="Monthly" value="monthly" />
                            </Picker>
                        </View>
                    )}
                />
                {errors.wateringSchedule && (
                    <Text style={styles.errorText}>
                        {errors.wateringSchedule.message}
                    </Text>
                )}
            </View>

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.submitButton}
                disabled={loading}
            >
                <Text style={styles.submitText}>
                    {loading ? 'Saving...' : 'Save Plant'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddPlantScreen;
