/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { EventSubService } from '../event-sub.service';
import { WebsocketManagerService } from 'src/ws-server/websocket-manager.service';
import { ChannelRewardConfigDbService } from 'src/db/channel-reward-configuration/channel-reward-config.service';
import { ChannelRewardMessage } from './dto/channel-reward-message';

@Injectable()
export class ChannelRewardEventSubService {
  private readonly log = new Logger(ChannelRewardEventSubService.name);
  constructor(
    private listener: EventSubService,
    private websocketServer: WebsocketManagerService,
    private configDb: ChannelRewardConfigDbService,
  ) {}

  /**
   * listens for all channel rewards
   */
  subscribeForRewards(userId: string): void {
    const listener = this.listener.getRef();
    listener.onChannelRedemptionAdd(userId, (reward) => {
      this.handleRedemption(userId, reward.rewardId).catch((e) => {
        this.log.error(`error occurred handling redemption: ${e}`);
      });
    });
  }

  private async handleRedemption(userId: string, rewardId: string): Promise<void> {
    const res = await this.configDb.getSingle(rewardId);
    if (res === null) return;
    if (!res.isEnabled) return;
    this.websocketServer.sendMessage(userId, new ChannelRewardMessage(res));
  }
}
