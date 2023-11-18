import { Injectable } from '@nestjs/common';
import { TwitchUsersService } from 'src/twitch-api/users/twitch-users.service';
import { UserDetailResponse } from './dto/user-detail-response';

@Injectable()
export class UserService {
  constructor(private twitchApi: TwitchUsersService) {}

  async getUserDetails(userId: string): Promise<UserDetailResponse> {
    const user = await this.twitchApi.getUserDetails(userId);
    if (user === null) {
      throw new Error(`twitch userId: ${userId} not found`);
    }
    return new UserDetailResponse(user);
  }
}
