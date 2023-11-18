import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TwitchChannelRewardService } from './channel-reward/channel-reward.service';
import { AuthProviderService } from './auth-provider.service';
import { TwitchApiClient } from './api-client.service';
import { DatabaseModule } from 'src/db/database.module';
import { TwitchUsersService } from './users/twitch-users.service';

const SERVICES = [
  TwitchChannelRewardService,
  TwitchUsersService,
  AuthProviderService,
  TwitchApiClient,
];

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: SERVICES,
  exports: SERVICES,
})
export class TwitchApiModule {}
