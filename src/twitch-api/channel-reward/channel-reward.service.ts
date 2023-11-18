/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TwitchApiClient } from '../api-client.service';
import { HelixCustomReward } from '@twurple/api';

@Injectable()
export class TwitchChannelRewardService {
  constructor(
    private twitchApi: TwitchApiClient,
  ) {}

  async getChannelRewards(userId: string): Promise<HelixCustomReward[]> {
    return await this.twitchApi.execute(async (client) => {
      return await client.channelPoints.getCustomRewards(userId);
    });
  }
}
