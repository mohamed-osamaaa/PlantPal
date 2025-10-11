import { AuthenticationGuard } from 'src/utils/authentication.guard';
import { CurrentUser } from 'src/utils/currentUser.decorator';

import {
  Body,
  Controller,
  Get,
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


  @Get('check-auth')
  @UseGuards(AuthenticationGuard)
  async checkAuth(@CurrentUser() user: IUser) {
    return {
      valid: true,
      user,
    };
  }
}
