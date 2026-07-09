import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createTemporaryUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body, '');
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    const users = await this.usersService.find(email);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
