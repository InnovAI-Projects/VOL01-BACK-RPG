import { Controller, Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createTemporaryUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body, '');
    return user;
  }

  //@Get()
}
