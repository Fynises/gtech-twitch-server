import { Injectable, Logger } from '@nestjs/common';
import { WebsocketConfigDbService } from 'src/db/websocket-config/websocket-config.service';
import { WebsocketManagerService } from 'src/ws-server/websocket-manager.service';

@Injectable()
export class WebsocketConfigService {
  private readonly log = new Logger(WebsocketConfigService.name);
  constructor(
    private readonly db: WebsocketConfigDbService,
    private websocketManager: WebsocketManagerService,
  ) {}

  /**
   * executes the get db function
   * if initial return was null, then service will attempt to regenerate it
   */
  async get(userId: string): Promise<string | null> {
    const websocketUid = await this.db.get(userId);
    if (websocketUid === null) {
      await this.db.create(userId);
      return await this.db.get(userId);
    } else {
      return websocketUid;
    }
  }

  /**
   * executes the regenerate db function
   */
  async update(userId: string): Promise<string> {
    const newUid = await this.db.regenerate(userId);
    this.websocketManager.disconnectAll(userId);
    return newUid;
  }
}
