import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(storedUser: Partial<User>, passwordHash: string) {
    const createdAt = new Date().toJSON();
    storedUser.passwordHash = passwordHash;
    storedUser.isActive = true;
    storedUser.createdAt = createdAt;
    storedUser.updatedAt = createdAt;

    const user = this.repo.create(storedUser);

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find(email: string | undefined) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // if (attrs.passwordHash) {
    //   attrs.passwordHash = await this.authService.updatePassword(
    //     attrs.passwordHash,
    //   );
    // }
    Object.assign(user, attrs);
    user.updatedAt = new Date().toJSON();
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.isActive = false;
    return this.repo.save(user);
  }
}
