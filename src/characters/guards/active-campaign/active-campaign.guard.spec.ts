import { Test } from '@nestjs/testing';
import { ActiveCampaignGuard } from './active-campaign.guard';
import { CampaignsService } from '../../../campaigns/campaigns.service';

describe('ActiveCampaignGuard', () => {
  const mockCampaignsService = {
    findById: jest.fn(),
  };

  let guard: ActiveCampaignGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ActiveCampaignGuard,
        { provide: CampaignsService, useValue: mockCampaignsService },
      ],
    }).compile();

    guard = module.get(ActiveCampaignGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
