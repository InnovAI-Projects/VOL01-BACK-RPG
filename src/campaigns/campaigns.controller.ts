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
  Param,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { MinLength } from 'class-validator';
import { FindCampaingsDto } from './dtos/find-campaingns.dto';
import { dot } from 'node:test/reporters';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private campaignService: CampaignsService) {}

  @Post()
  createCampaign(@Body() body: CreateCampaignDto, @Req() req) {
    return this.campaignService.create(body, req.user.id);
  }

  @Get()
  findAllCampaigns(@Query('page') page: number) {
    return this.campaignService.findAll(page ?? 1);
  }

  @Get('/:id')
  findCampaignById(@Param('id') id: number, @Req() req) {
    return this.campaignService.findById(id, req.user.id);
  }

  @Patch('/:id')
  updateCampaign(
    @Body() body: UpdateCampaignDto,
    @Param('id') id: number,
    @Req() req,
  ) {
    return this.campaignService.update(body, id, req.user.id);
  }

  @Delete('/:id')
  removeCampaign(@Param('id') id: number, @Req() req) {
    return this.campaignService.remove(id, req.user.id);
  }
}
