import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/users.entity';
import { Campaign } from '../campaigns/campaigns.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  campaignId: number;

  @ManyToOne((type) => Campaign)
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;

  @Column()
  name: string;

  @Column()
  race: string;

  @Column()
  characterClass: string;

  @Column()
  level: number;

  @Column()
  hp: number;

  @Column()
  maxHp: number;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
