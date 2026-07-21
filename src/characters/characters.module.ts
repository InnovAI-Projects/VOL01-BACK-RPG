import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { ObjectsService } from '../objects/objects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './characters.entity';
import { CampaignsModule } from '../campaigns/campaigns.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), CampaignsModule],
  providers: [CharactersService, ObjectsService],
  controllers: [CharactersController],
})
export class CharactersModule {}
