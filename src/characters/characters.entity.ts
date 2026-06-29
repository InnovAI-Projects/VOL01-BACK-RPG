import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { User } from '../users/users.entity';
import { Campaign } from '../campaigns/campaigns.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  userId: number;

  @ManyToMany((type) => Campaign, (campaign) => campaign.id)
  campaignId: number;

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

  @Column()
  avatarUrl: string;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
