import {
  FirebaseNotificationService,
} from 'src/notifications/firebase-notification.service';

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../db/database.module';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { plantsProviders } from './providers/plants.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [PlantsController],
  providers: [
    PlantsService,
    ...plantsProviders,
    FirebaseNotificationService
  ],
})

export class PlantsModule { }