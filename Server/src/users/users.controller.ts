import { AuthenticationGuard } from 'src/utils/authentication.guard';
import { CurrentUser } from 'src/utils/currentUser.decorator';

import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { IUser } from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }


  @UseGuards(AuthenticationGuard)
  @Get('check-auth')
  async checkAuth(@CurrentUser() user: IUser) {
    return {
      valid: true,
      user,
    };
  }

  @UseGuards(AuthenticationGuard)
  @Patch('reminder-settings')
  async updateReminderSettings(
    @CurrentUser() user: IUser,
    @Body('reminderEnabled') reminderEnabled: boolean | true,
    @Body('reminderHour') reminderHour: number | 7,
  ) {
    return this.usersService.updateReminderSettings(
      user._id,
      reminderEnabled,
      reminderHour,
    );
  }
}
