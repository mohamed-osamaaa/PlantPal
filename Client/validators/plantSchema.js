import { z } from 'zod';

export const plantSchema = z.object({
    name: z.string().min(1, "Plant name is required"),
    wateringSchedule: z.enum(["daily", "weekly", "bi-weekly", "monthly"], {
        required_error: "Please select a watering schedule",
    }),
});
