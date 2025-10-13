import { Model } from 'mongoose';
import {
    FirebaseNotificationService,
} from 'src/notifications/firebase-notification.service';
import { IUser } from 'src/users/interfaces/users.interface';

import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {
    Cron,
    CronExpression,
} from '@nestjs/schedule';

import { CreatePlantDto } from './dto/create-plant.dto';
import { IPlant } from './interfaces/plants.interface';
import { calculateNextWatering } from './utils/calc-watering';

@Injectable()
export class PlantsService {
    constructor(
        @Inject('PLANT_MODEL')
        private readonly plantModel: Model<IPlant & Document>,
        private readonly firebaseNotificationService: FirebaseNotificationService,
    ) { }


    @Cron(CronExpression.EVERY_HOUR)
    async checkPlantsForWatering() {
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const todayEnd = new Date(now.setHours(23, 59, 59, 999));
        const currentHour = new Date().getHours();

        const plants = await this.plantModel.find({
            nextWatering: { $gte: todayStart, $lte: todayEnd },
        }).populate('user');

        for (const plant of plants) {
            const user = plant.user as IUser;

            if (user.reminderEnabled && user.reminderHour === currentHour && user.fcmToken) {
                await this.firebaseNotificationService.sendNotification(
                    user.fcmToken,
                    '🌱 Water Reminder',
                    `It's time to water your plant "${plant.name}"!`
                );
                console.log(`✅ Sent FCM notification to ${user.email}`);
            }
        }
    }

    async create(createDto: CreatePlantDto, file: Express.Multer.File | undefined, userId: string) {
        try {
            if (!userId) throw new BadRequestException('User ID is required');

            const { name, wateringSchedule = 'daily' } = createDto;

            const imagePath = file ? `/uploads/${file.filename}` : '';

            const now = new Date();
            const nextWatering = calculateNextWatering(now, wateringSchedule);

            const created = await this.plantModel.create({
                user: userId,
                name,
                image: imagePath,
                wateringSchedule,
                lastWatered: null,
                nextWatering,
            });

            return created;
        } catch (err) {
            if (err.status && err.message) throw err;
            throw new InternalServerErrorException(err.message || 'Failed to create plant');
        }
    }

    async markWatered(plantId: string, userId: string) {
        try {
            const plant = await this.plantModel.findById(plantId);
            if (!plant) throw new NotFoundException('Plant not found');

            if (plant.user.toString() !== userId) {
                throw new ForbiddenException('You are not allowed to update this plant');
            }

            const lastWatered = new Date();
            const nextWatering = calculateNextWatering(lastWatered, plant.wateringSchedule);

            plant.lastWatered = lastWatered;
            plant.nextWatering = nextWatering;

            await plant.save();

            return plant;
        } catch (err) {
            if (err.status && err.message) throw err;
            throw new InternalServerErrorException(err.message || 'Failed to mark as watered');
        }
    }

    async findAllPlantsByUser(userId: string): Promise<IPlant[]> {
        try {
            if (!userId) throw new BadRequestException('User ID is required');

            return await this.plantModel.find({ user: userId }).exec();
        } catch (err) {
            if (err.status && err.message) throw err;
            throw new InternalServerErrorException(err.message || 'Failed to fetch plants');
        }
    }

    async findPlantById(plantId: string, userId: string): Promise<IPlant> {
        try {
            if (!plantId) throw new BadRequestException('Plant ID is required');
            if (!userId) throw new BadRequestException('User ID is required');

            const plant = await this.plantModel.findById(plantId);
            if (!plant) throw new NotFoundException('Plant not found');

            if (plant.user.toString() !== userId) {
                throw new ForbiddenException('You are not allowed to access this plant');
            }

            return plant;
        } catch (err) {
            if (err.status && err.message) throw err;
            throw new InternalServerErrorException(err.message || 'Failed to fetch plant');
        }
    }
}
