import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CampaignsService } from '../../../campaigns/campaigns.service';

@Injectable()
export class ActiveCampaignGuard implements CanActivate {
  constructor(private campaignsService: CampaignsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const campaignId = request.body.campaignId;

    return this.campaignsService
      .findById(campaignId, request.user.id)
      .then((x) => x.isActive);
  }
}
