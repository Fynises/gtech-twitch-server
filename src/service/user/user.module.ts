import { Module } from '@nestjs/common';
import { TwitchApiModule } from 'src/twitch-api/twitch-api.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TwitchApiModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
