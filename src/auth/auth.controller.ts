import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body, body.passwordHash);
    return user;
  }

  @Get('/me')
  async whoIsMe() {}
}
