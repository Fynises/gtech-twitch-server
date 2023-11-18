import { plainToInstance } from 'class-transformer';
import { ChannelRewardConfigEntity } from '../channel-reward-config.entity';
import { ActivationConfig } from './activation-config';

/**
 * data class to use as a response and request for\
 * modifying the configuration.
 */
export class ChannelRewardDto {
  id: string;
  channelRewardId: string;
  isEnabled: boolean;
  activationConfig: ActivationConfig;

  constructor(entity: ChannelRewardConfigEntity) {
    this.id = entity.id;
    this.channelRewardId = entity.channelRewardId;
    this.isEnabled = entity.isEnabled;
    this.activationConfig = plainToInstance(
      ActivationConfig,
      entity.activationConfig,
    );
  }
}
