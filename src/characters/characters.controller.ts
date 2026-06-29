import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { Character } from './characters.entity';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  getAllCharacters() {
    return this.charactersService.getAll();
  }
}
