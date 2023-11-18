import { Injectable, Logger } from '@nestjs/common';
import { ApiClient } from '@twurple/api';
import { RefreshingAuthProvider, exchangeCode } from '@twurple/auth';
import { TwitchAuthDbService } from 'src/db/twitch-auth/twitch-auth.service';

@Injectable()
export class AuthProviderService {
  private readonly log = new Logger(AuthProviderService.name);

  private authProvider: RefreshingAuthProvider;

  constructor(private readonly authDb: TwitchAuthDbService) {
    const authProvider = new RefreshingAuthProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    });
    this.initOnRefresh(authProvider);
    this.authProvider = authProvider;
  }

  /**
   * creates an API client using this authProvider instance
   */
  createApiClient(): ApiClient {
    const client = new ApiClient({ authProvider: this.authProvider });
    return client;
  }

  private initOnRefresh(authProvider: RefreshingAuthProvider) {
    authProvider.onRefresh(async (userId, newTokenData) => {
      await this.authDb.onSave(userId, newTokenData);
    });
  }

  /**
   * logs in the user and returns the userId
   * @param code authentication code
   */
  async login(code: string): Promise<string> {
    const tokenData = await exchangeCode(
      process.env.TWITCH_CLIENT_ID,
      process.env.TWITCH_CLIENT_SECRET,
      code,
      process.env.TWITCH_REDIRECT_URI,
    );
    const userId = await this.authProvider.addUserForToken(tokenData);
    if (tokenData.refreshToken === null) {
      throw new Error(`refresh token was null: ${JSON.stringify(tokenData)}`);
    }
    await this.authDb.onSave(userId, tokenData);
    return userId;
  }
}
