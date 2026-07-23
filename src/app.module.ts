import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { Character } from './characters/characters.entity';
import { User } from './users/users.entity';
import { Campaign } from './campaigns/campaigns.entity';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ObjectsService } from './objects/objects.service';
import dbConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [dbConfig.KEY],
      useFactory: (config: ConfigType<typeof dbConfig>) => config,
    }),
    CharactersModule,
    UsersModule,
    CampaignsModule,
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ObjectsService],
})
export class AppModule {}
