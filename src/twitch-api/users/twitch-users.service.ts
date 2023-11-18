import { Injectable } from '@nestjs/common';
import { TwitchApiClient } from '../api-client.service';
import { HelixUser } from '@twurple/api';

@Injectable()
export class TwitchUsersService {
  constructor(private api: TwitchApiClient) {}

  async getUserDetails(userId: string): Promise<HelixUser | null> {
    return await this.api.execute(async (client) => {
      return await client.users.getUserById(userId);
    });
  }
}
