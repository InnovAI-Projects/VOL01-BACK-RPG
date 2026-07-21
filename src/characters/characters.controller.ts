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
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';

@Controller('characters')
@UseGuards(JwtAuthGuard)
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

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
}
