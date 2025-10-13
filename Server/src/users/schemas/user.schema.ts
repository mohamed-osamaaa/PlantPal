import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    fcmToken: {
        type: String,
        default: null,
    },
    reminderEnabled: {
        type: Boolean,
        default: true,
    },
    reminderHour: {
        type: Number,
        default: 7, // 7 AM
    },
}, {
    timestamps: true,
});