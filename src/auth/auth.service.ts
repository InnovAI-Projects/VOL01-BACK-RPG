import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../users/users.entity';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { type ConfigType } from '@nestjs/config';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async signUp(storedUser: Partial<User>, password: string) {
    const [users] = await this.usersService.find(storedUser.email!);

    if (users) {
      if (!users.isActive) {
        users.isActive = true;
        return users;
      }
      throw new BadRequestException('email in use');
    }

    const result = await this.encryptPassword(password);

    const user = await this.usersService.create(storedUser, result);

    return this.createToken(user);
  }

  async signIn(email: string, passwordHash: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!user.isActive) {
      throw new ForbiddenException('user deleted');
    }

    const [salt, storedHash] = user.passwordHash.split('.');

    const hash = (await scrypt(passwordHash, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return this.createToken(user);
  }

  async encryptPassword(password: string) {
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return salt + '.' + hash.toString('hex');
  }

  async updatePassword(password: string) {
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    return result;
  }

  async createToken(user: User) {
    const payload: AuthJwtPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshTokenConfig,
    );

    return { token, refreshToken };
  }

  async refreshToken(userId: number, name: string, email: string) {
    const payload: AuthJwtPayload = { sub: userId, name: name, email: email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
