import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCampaignDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  bannerUrl: string;
}
