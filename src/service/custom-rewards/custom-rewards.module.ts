import { Module } from '@nestjs/common';
import { CustomRewardsController } from './custom-rewards.controller';
import { CustomRewardsService } from './custom-rewards.service';
import { TwitchApiModule } from 'src/twitch-api/twitch-api.module';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule, TwitchApiModule],
  controllers: [CustomRewardsController],
  providers: [CustomRewardsService],
})
export class CustomRewardsModule {}
