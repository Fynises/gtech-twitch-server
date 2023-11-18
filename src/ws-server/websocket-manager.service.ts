import { Injectable, Logger } from '@nestjs/common';
import { WebsocketConfigDbService } from 'src/db/websocket-config/websocket-config.service';
import { WebSocketSession } from './dto/websocket-session';
import { SessionMap } from './dto/session-map';
import { WebSocketMessageBody } from 'src/util/websocket-message-body';

/**
 * service for managing websocket connections and hooks up to rest of application
 */
@Injectable()
export class WebsocketManagerService {
  private readonly log = new Logger(WebsocketManagerService.name);

  private sessionMap: SessionMap;

  constructor(private readonly wsConfigDb: WebsocketConfigDbService) {
    this.sessionMap = new SessionMap();
  }

  async register(session: WebSocketSession): Promise<void> {
    const isValidId = await this.wsConfigDb.validateAuthKey(session.authKey);
    if (isValidId === null) {
      session.closeSocket();
      return;
    }
    session.socket.on('close', () => {
      this.sessionMap.handleClose(isValidId, session.sessionUid);
    });
    this.sessionMap.insertNew(isValidId, session);
  }

  async remove(): Promise<void> {
    //TODO
  }

  /**
   * sends a message to all websocket sessions associated to a given user
   * @param userId twitch user_id of the user to send message to
   * @param message body of the message, in JSON string format
   */
  sendMessage<T extends WebSocketMessageBody>(
    userId: string,
    message: T,
  ): void {
    try {
      this.sessionMap.sendAll(userId, message);
    } catch (e) {
      this.log.error(`error occurred sending message to :${userId}, ${e}`);
      throw new Error(`error occurred sending message to userId: ${userId}`);
    }
  }
}
