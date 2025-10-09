import mongoose from 'mongoose';

export const PlantSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
        wateringSchedule: {
            type: String,
            enum: ["daily", "weekly", "bi-weekly", "monthly"],
            default: "daily",
        },
        lastWatered: {
            type: Date,
            default: null,
        },
        nextWatering: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);
