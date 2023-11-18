import { Module } from '@nestjs/common';
import { TwitchApiModule } from 'src/twitch-api/twitch-api.module';
import { EventSubService } from './event-sub.service';
import { ChannelRewardEventSubService } from './channel-reward/channel-reward-es.service';
import { DatabaseModule } from 'src/db/database.module';
import { WebsocketServerModule } from 'src/ws-server/ws-server.module';

const SUB_SERVICES = [ChannelRewardEventSubService];

@Module({
  imports: [TwitchApiModule, DatabaseModule, WebsocketServerModule],
  providers: [EventSubService, ...SUB_SERVICES],
  exports: [EventSubService, ...SUB_SERVICES],
})
export class EventSubModule {}
