import { ChannelRewardDto } from 'src/db/channel-reward-configuration/dto/channel-reward-dto';

export class ActivationParamResponse {
  data: ChannelRewardDto[];

  constructor(data: ChannelRewardDto[]) {
    this.data = data;
  }
}
