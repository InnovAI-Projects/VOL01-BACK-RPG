import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MinLength,
} from 'class-validator';

export class CreateCharacterDto {
  @IsNumber()
  campaignId: number;

  @IsString()
  name: string;

  @IsString()
  @MinLength(3)
  race: string;

  @IsString()
  characterClass: string;

  @IsNumber()
  @Min(1)
  @Max(20)
  level: number;

  @IsNumber()
  @Min(1)
  maxHp: number;

  @IsString()
  @IsOptional()
  avatarUrl: string;
}
