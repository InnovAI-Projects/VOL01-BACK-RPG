import { registerAs } from '@nestjs/config';
import { Character } from '../characters/characters.entity';
import { User } from '../users/users.entity';
import { Campaign } from '../campaigns/campaigns.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('db', (): TypeOrmModuleOptions => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  type: 'postgres',
  entities: [Character, User, Campaign],
  synchronize: true,
}));
