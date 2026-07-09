import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  passwordHash: string;
}
