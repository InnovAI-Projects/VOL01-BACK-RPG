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
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from '../guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async createUser(@Body() body: RegisterUserDto) {
    const user = await this.authService.signUp(body, body.password);
    console.log(user);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    return await this.authService.signIn(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async whoIsMe(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(
      req.user.id,
      req.user.name,
      req.user.email,
    );
  }
}
