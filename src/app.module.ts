import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';

import { Character } from './characters/characters.entity';
import { User } from './users/users.entity';
import { Campaign } from './campaigns/campaigns.entity';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.prototype',
      entities: [Character, User, Campaign],
      synchronize: true,
    }),
    CharactersModule,
    UsersModule,
    CampaignsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
