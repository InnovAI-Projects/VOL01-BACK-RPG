import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Query,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dtos/create-campaign.dto';

@Controller('campaigns')
@UseGuards()
export class CampaignsController {
  constructor(private campaignService: CampaignsService) {}

  @Post()
  createCampaign(@Body() body: CreateCampaignDto) {
    return this.campaignService.create(body);
  }

  @Get()
  findAllCampaigns() {}

  @Get()
  findCampaignById() {}

  @Patch()
  updateCampaign() {}

  @Delete()
  removeCampaign() {}
}
