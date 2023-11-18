import { Module } from '@nestjs/common';
import { ChannelRewardConfigDbModule } from './channel-reward-configuration/channel-reward-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchAuthDbModule } from './twitch-auth/twitch-auth.module';
import { WebsocketConfigDbModule } from './websocket-config/websocket-config.module';

const MODULES = [
  ChannelRewardConfigDbModule,
  TwitchAuthDbModule,
  WebsocketConfigDbModule,
];

@Module({
  imports: [TypeOrmModule, ...MODULES],
  exports: MODULES,
})
export class DatabaseModule {}
