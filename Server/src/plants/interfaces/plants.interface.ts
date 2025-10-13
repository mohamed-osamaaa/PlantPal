import { Document } from 'mongoose';
import { IUser } from 'src/users/interfaces/users.interface';

export interface IPlant extends Document {
    _id: string;
    user: IUser | string;
    name: string;
    image?: string;
    wateringSchedule: "daily" | "weekly" | "bi-weekly" | "monthly";
    lastWatered?: Date | null;
    nextWatering?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
