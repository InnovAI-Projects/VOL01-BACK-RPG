import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MinLength,
} from 'class-validator';

export class UpdateCharacterDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  race: string;

  @IsString()
  @IsOptional()
  characterClass: string;

  @IsNumber()
  @Min(1)
  @Max(20)
  @IsOptional()
  level: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  maxHp: number;

  @IsString()
  @IsOptional()
  avatarUrl: string;
}
