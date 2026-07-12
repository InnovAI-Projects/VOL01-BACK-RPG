import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../users/users.entity';
import { AuthJwtPayload } from './types/auth-jwtPayload';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async signUp(storedUser: Partial<User>, password: string) {
    const [users] = await this.usersService.find(storedUser.email);

    if (users) {
      if (!users.isActive) {
        users.isActive = true;
        return users;
      }
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(storedUser, result);

    return user;
  }

  async signIn(email: string, passwordHash: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.passwordHash.split('.');

    const hash = (await scrypt(passwordHash, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    const payload: AuthJwtPayload = { sub: user.id, username: user.name };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async updatePassword(password: string) {
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    return result;
  }
}
