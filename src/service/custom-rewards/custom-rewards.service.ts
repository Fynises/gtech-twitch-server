import { Injectable } from '@nestjs/common';
import { ChannelRewardConfigDbService } from 'src/db/channel-reward-configuration/channel-reward-config.service';
import { TwitchChannelRewardService } from 'src/twitch-api/channel-reward/channel-reward.service';
import { ActivationParamResponse } from './dto/activation-params-response';
import { HelixCustomReward } from '@twurple/api';
import { ChannelRewardDto } from 'src/db/channel-reward-configuration/dto/channel-reward-dto';

@Injectable()
export class CustomRewardsService {
  constructor(
    private readonly twitchRewardsService: TwitchChannelRewardService,
    private readonly channelRewardConfigDb: ChannelRewardConfigDbService,
  ) {}

  async getAll(userId: string): Promise<HelixCustomReward[]> {
    return await this.twitchRewardsService.getChannelRewards(userId);
  }

  async getActivationParams(
    configIds: string[],
  ): Promise<ActivationParamResponse> {
    // eslint-disable-next-line prettier/prettier
    const activationParams = await this.channelRewardConfigDb.getConfigs(configIds);
    return new ActivationParamResponse(activationParams);
  }

  async update(body: ChannelRewardDto): Promise<void> {
    await this.channelRewardConfigDb.update(body);
    // TODO: update config in cache for websocket connections
  }

  async createNewActivationParam(
    rewardId: string,
    userId: string,
  ): Promise<ChannelRewardDto> {
    return await this.channelRewardConfigDb.createConfiguration(
      rewardId,
      userId,
    );
  }
}
