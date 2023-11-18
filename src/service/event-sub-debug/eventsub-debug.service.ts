import { Injectable } from '@nestjs/common';
import { ChannelRewardConfigDbService } from 'src/db/channel-reward-configuration/channel-reward-config.service';
import { ChannelRewardEventSubService } from 'src/event-sub/channel-reward/channel-reward-es.service';

@Injectable()
export class EventSubDebugService {
  constructor(
    private esService: ChannelRewardEventSubService,
    private db: ChannelRewardConfigDbService,
  ) {}

  async reset(userId: string): Promise<void> {
    this.esService.subscribeForRewards(userId);
  }
}
