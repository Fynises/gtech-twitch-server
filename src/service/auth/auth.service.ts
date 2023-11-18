/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import LoginRequest from './dto/login-request';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload';
import { AuthProviderService } from 'src/twitch-api/auth-provider.service';
import { ChannelRewardEventSubService } from 'src/event-sub/channel-reward/channel-reward-es.service';

@Injectable()
export class AuthService {
  private readonly log = new Logger(AuthService.name);
  constructor(
    private twitchAuthProvider: AuthProviderService,
    private rewardsEventSub: ChannelRewardEventSubService,
    private jwtService: JwtService,
  ) {}

  /**
   * logs in the user, registers it with the twitch api, and creates an eventsub listener for every
   * new event
   */
  async login(data: LoginRequest): Promise<string> {
    const res = await this.twitchAuthProvider.login(data.code);
    await this.rewardsEventSub.subscribeForRewards(res);
    return await this.jwtService.signAsync({ userId: res } as JwtPayload);
  }
}
