export function calculateNextWatering(fromDate: Date, schedule: string): Date {
    const next = new Date(fromDate);

    switch (schedule) {
        case 'daily':
            next.setDate(next.getDate() + 1);
            break;
        case 'weekly':
            next.setDate(next.getDate() + 7);
            break;
        case 'bi-weekly':
            next.setDate(next.getDate() + 14);
            break;
        case 'monthly':
            next.setMonth(next.getMonth() + 1);
            break;
        default:
            next.setDate(next.getDate() + 1);
    }

    return next;
}
