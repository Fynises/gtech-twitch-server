import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchAuthEntity } from './twitch-auth.entity';
import { TwitchAuthDbService } from './twitch-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([TwitchAuthEntity])],
  providers: [TwitchAuthDbService],
  exports: [TwitchAuthDbService],
})
export class TwitchAuthDbModule {}
