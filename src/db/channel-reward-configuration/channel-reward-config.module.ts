import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelRewardConfigEntity } from './channel-reward-config.entity';
import { Module } from '@nestjs/common';
import { ChannelRewardConfigDbService } from './channel-reward-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelRewardConfigEntity])],
  providers: [ChannelRewardConfigDbService],
  exports: [ChannelRewardConfigDbService],
})
export class ChannelRewardConfigDbModule {}
