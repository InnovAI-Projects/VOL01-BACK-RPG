import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../auth/config/jwt.config';
import refreshJwtConfig from '../auth/config/refresh-jwt.config';
import { ObjectsService } from '../objects/objects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, ObjectsService],
})
export class UsersModule {}
