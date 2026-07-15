import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './campaigns.entity';
import { ObjectsService } from '../objects/objects.service';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign) private repo: Repository<Campaign>,
    private objectsService: ObjectsService,
  ) {}

  async create(body: Partial<Campaign>) {
    this.objectsService.instantiateVar(body);

    const campaign = await this.repo.create(body);

    return this.repo.save(campaign);
  }
}
