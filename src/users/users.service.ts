import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { ObjectsService } from '../objects/objects.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private objectsService: ObjectsService,
  ) {}

  async create(storedUser: Partial<User>, passwordHash: string) {
    this.objectsService.instantiateVar(storedUser);
    storedUser.passwordHash =
      await this.authService.encryptPassword(passwordHash);
    if (!storedUser.email) {
      storedUser.email = '';
    }

    const user = this.repo.create(storedUser);

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  // function is not being used
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async findAll(pageNumber: number) {
    if (pageNumber <= 0) {
      throw new BadRequestException('index out of range');
    }
    const users = await this.repo.find({
      take: 20,
      skip: (pageNumber - 1) * 20,
    });
    if (users.length === 0) {
      throw new BadRequestException('index out of range');
    }
    return users;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (attrs.passwordHash) {
      attrs.passwordHash = await this.authService.updatePassword(
        attrs.passwordHash,
      );
    }
    this.objectsService.updateVar(attrs);
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.isActive = false;
    this.objectsService.updateVar(user);

    this.repo.save(user);
  }
}
