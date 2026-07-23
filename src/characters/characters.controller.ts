import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  Req,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { UpdateCharacterDto } from './dtos/update-character.dto';
import { ActiveCampaignGuard } from './guards/active-campaign/active-campaign.guard';

@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @UseGuards(ActiveCampaignGuard)
  @Post()
  createCharacter(@Req() req, @Body() body: CreateCharacterDto) {
    return this.charactersService.create(body, req.user.id);
  }

  @Get()
  getAllCharactersFromUser(@Req() req) {
    return this.charactersService.findAll(req.user.id);
  }

  @Get('/:id')
  getCharacterById(@Param('id') id: number, @Req() req) {
    return this.charactersService.findById(id, req.user.id);
  }

  @Patch('/:id')
  updateCharacterById(
    @Param('id') id: number,
    @Req() req,
    @Body() body: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, req.user.id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  removeCharacterById(@Param('id') id: number, @Req() req) {
    return this.charactersService.remove(id, req.user.id);
  }
}
