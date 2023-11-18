import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TwitchApiModule } from 'src/twitch-api/twitch-api.module';
import { EventSubModule } from 'src/event-sub/event-sub.module';

@Module({
  imports: [TwitchApiModule, EventSubModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
