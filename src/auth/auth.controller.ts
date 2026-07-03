import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.passwordHash);
    return user;
  }

  @Get('/me')
  async whoIsMe() {}
}
