import { Connection } from 'mongoose';

import { UserSchema } from '../schemas/plant.schema';

export const usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('Plant', UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];