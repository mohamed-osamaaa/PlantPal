export interface IUser {
    _id: string;
    email: string;
    password: string;
    fcmToken: string;
    reminderEnabled: boolean;
    reminderHour: number | 7;
    createdAt?: Date;
    updatedAt?: Date;
}