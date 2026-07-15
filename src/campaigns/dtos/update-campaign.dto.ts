import { IsString, IsOptional } from 'class-validator';

export class CreateCampaignDto {
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
