import { instanceToPlain } from 'class-transformer';
import { ChannelRewardDto } from 'src/db/channel-reward-configuration/dto/channel-reward-dto';
import { WebSocketMessageBody } from 'src/util/websocket-message-body';

export class ChannelRewardMessage implements WebSocketMessageBody {
  duration: number;
  magnitude: number;

  constructor(dto: ChannelRewardDto) {
    this.duration = dto.activationConfig.duration;
    this.magnitude = dto.activationConfig.power / 100.0;
  }

  toJsonString(): string {
    const plain = instanceToPlain(this);
    return JSON.stringify(plain);
  }
}
