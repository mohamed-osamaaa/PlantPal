import {
    NextFunction,
    Request,
    Response,
} from 'express';
import { IUser } from 'src/users/interfaces/users.interface';

import {
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

declare module 'express-serve-static-core' {
    interface Request {
        currentUser?: IUser | null;
    }
}

interface JwtPayload {
    id: string;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaderRaw =
            (req.headers['authorization'] as string) ||
            (req.headers['Authorization'] as string);

        const authHeader = Array.isArray(authHeaderRaw)
            ? authHeaderRaw[0]
            : authHeaderRaw;

        if (!authHeader) {
            req.currentUser = null;
            return next();
        }

        if (!authHeader.startsWith('Bearer ')) {
            req.currentUser = null;
            return next();
        }

        const token = authHeader.split(' ')[1];

        try {
            const { id } = await this.jwtService.verifyAsync<JwtPayload>(
                token,
                { secret: process.env.ACCESS_TOKEN_SECRET_KEY },
            );

            const user = await this.usersService.findOneById(id);

            req.currentUser = user ?? null;
        } catch (err: any) {
            console.log('Token verification failed:', err.message);
            req.currentUser = null;
        }

        next();
    }
}