import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventSubWsListener } from '@twurple/eventsub-ws';
import { TwitchApiClient } from 'src/twitch-api/api-client.service';

@Injectable()
export class EventSubService implements OnModuleInit {
  private readonly log = new Logger(EventSubService.name);
  private listener: EventSubWsListener;

  constructor(private apiClient: TwitchApiClient) {
    const listener = apiClient.createEventSubListener();
    listener.start();
    this.listener = listener;
  }

  onModuleInit() {
    this.listener.onUserSocketConnect((userId) => {
      this.log.log(`user: ${userId} successfully connected to event socket`);
    });
    this.listener.onUserSocketDisconnect((userId) => {
      this.log.log(`user: ${userId} successfully disconnected from event socket`);
    });
    this.listener.onSubscriptionCreateFailure((sub, e) => {
      this.log.log(`error occurred creating subscription: ${sub.id} for user ${sub.authUserId}, error: ${e}`);
    });
  }

  getRef(): EventSubWsListener {
    return this.listener;
  }
}
