export interface IPlant {
    _id: string;
    user: string;
    name: string;
    image?: string;
    wateringSchedule: "daily" | "weekly" | "bi-weekly" | "monthly";
    lastWatered?: Date | null;
    nextWatering?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
