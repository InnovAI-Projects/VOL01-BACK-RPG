import { MinLength, IsNumber, IsOptional } from 'class-validator';

export class FindCampaingsDto {
  @IsNumber()
  @MinLength(1)
  @IsOptional()
  page: number;
}
