import { Model } from 'mongoose';

import {
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { IUser } from './interfaces/users.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private readonly usersRepository: Model<IUser>,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterUserDto): Promise<IUser> {
        try {
            const existing = await this.usersRepository.findOne({ email: dto.email });
            if (existing) {
                throw new ConflictException('Email already registered');
            }

            const user = await this.usersRepository.create({
                ...dto,
                password: dto.password,
            });

            return user;
        } catch (error) {
            throw new InternalServerErrorException('Failed to register user');
        }
    }

    async login(dto: LoginDto) {
        try {
            const user = await this.usersRepository.findOne({ email: dto.email }).select('+password');;
            if (!user) throw new UnauthorizedException('Invalid credentials');

            if (user.password !== dto.password) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const payload = { id: user._id };
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_SECRET_KEY,
                expiresIn: '7d',
            });

            return { accessToken: token, user };
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException('Failed to login');
        }
    }

    async findOneById(id: string) {
        try {
            return await this.usersRepository.findById(id);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch user by id');
        }
    }

    async updateReminderSettings(userId: string, enabled: boolean, hour: number) {
        try {
            const user = await this.usersRepository.findById(userId);
            if (!user) throw new UnauthorizedException('User not found');
            user.reminderEnabled = enabled;
            user.reminderHour = hour;
            await user.save();
            return user;
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException('Failed to update reminder settings');
        }
    }
}
