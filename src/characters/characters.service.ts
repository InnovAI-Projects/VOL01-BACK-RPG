import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Character } from './characters.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectsService } from '../objects/objects.service';
import { CampaignsService } from '../campaigns/campaigns.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character) private repo: Repository<Character>,
    private objectsService: ObjectsService,
    private campaignsService: CampaignsService,
  ) {}

  async create(char: Partial<Character>, userId: number) {
    this.objectsService.instantiateVar(char);
    await this.instantiateCharacter(char, userId);

    this.repo.create(char);
    return this.repo.save(char);
  }

  findAll(userId: number) {
    return this.repo.find({ where: { userId: userId } });
  }

  async findById(id: number, userId: number) {
    const char = await this.repo.findOne({ where: { id: id } });

    if (!char) {
      throw new NotFoundException('character not found');
    }

    if (char.userId !== userId) {
      throw new ForbiddenException('character does not belong to this user');
    }

    return char;
  }

  async instantiateCharacter(char: Partial<Character>, userId: number) {
    char.hp = char.maxHp;
    char.userId = userId;
    char.campaignId = await this.campaignsService
      .findById(char.campaignId!, userId)
      .then((x) => x.id);

    return char;
  }
}
