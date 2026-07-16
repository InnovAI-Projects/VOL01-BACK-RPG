import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './campaigns.entity';
import { ObjectsService } from '../objects/objects.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignsController],
  providers: [CampaignsService, ObjectsService],
})
export class CampaignsModule {}
