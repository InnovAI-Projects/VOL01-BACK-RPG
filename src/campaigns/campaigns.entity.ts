import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  bannerUrl: string;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
