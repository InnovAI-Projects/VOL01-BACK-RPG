import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @Serialize(UserDto)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body, body.passwordHash);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.authService.signIn(body.email, body.passwordHash);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async whoIsMe(@Request() req) {
    return req.user;
  }
}
