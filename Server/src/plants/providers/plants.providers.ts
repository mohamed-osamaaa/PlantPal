import { Connection } from 'mongoose';

import { PlantSchema } from '../schemas/plant.schema';

export const plantsProviders = [
    {
        provide: 'PLANT_MODEL',
        useFactory: (connection: Connection) => connection.model('Plant', PlantSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];