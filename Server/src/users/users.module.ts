import { DatabaseModule } from 'db/database.module';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { usersProviders } from './providers/users.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class usersModule { }
