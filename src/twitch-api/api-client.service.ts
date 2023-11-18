import { Injectable, Logger } from '@nestjs/common';
import { AuthProviderService } from './auth-provider.service';
import { ApiClient } from '@twurple/api';
import { EventSubWsListener } from '@twurple/eventsub-ws';

@Injectable()
export class TwitchApiClient {
  private readonly log = new Logger(TwitchApiClient.name);
  private apiClient: ApiClient;
  constructor(private authProvider: AuthProviderService) {
    this.apiClient = authProvider.createApiClient();
  }

  async execute<T>(fn: (client: ApiClient) => Promise<T>): Promise<T> {
    try {
      return await fn(this.apiClient);
    } catch (e) {
      this.log.error(`error occurred while calling API: ${e}`);
      throw e;
    }
  }

  createEventSubListener(): EventSubWsListener {
    const listener = new EventSubWsListener({ apiClient: this.apiClient });
    return listener;
  }
}
