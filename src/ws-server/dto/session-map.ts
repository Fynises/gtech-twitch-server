import { Logger } from '@nestjs/common';
import { WebSocketSession } from './websocket-session';
import { WebSocketUserMap } from './websocket-user-map';
import { WebSocketMessageBody } from 'src/util/websocket-message-body';

/**
 * object to manage websocket sessions
 */
export class SessionMap {
  private readonly log = new Logger(SessionMap.name);

  /**
   * Key: twitch user_id
   * Value: UserMap
   */
  private sessions: Map<string, WebSocketUserMap>;

  constructor() {
    this.sessions = new Map();
  }

  insertNew(userId: string, session: WebSocketSession): void {
    const userMap = this.sessions.get(userId);
    if (userMap !== undefined) {
      userMap.addSession(session);
    } else {
      this.sessions.set(userId, new WebSocketUserMap(userId, session));
    }
  }

  handleClose(userId: string, sessionUid: string): void {
    this.getByUser(userId, (map) => {
      map.removeSession(sessionUid);
      if (map.isEmpty()) {
        const deleteResult = this.sessions.delete(userId);
        if (!deleteResult) {
          // eslint-disable-next-line prettier/prettier
          throw new Error(`error occurred removing session, userId: ${userId} didn't exist`);
        }
      }
    });
  }

  sendAll<T extends WebSocketMessageBody>(userId: string, message: T): void {
    this.getByUser(userId, (map) => map.sendMessage(message.toJsonString()));
  }

  /**
   * helper function to functionally get a userMap reference
   */
  private getByUser(userId: string, fn: (userMap: WebSocketUserMap) => void) {
    const userMap = this.sessions.get(userId);
    if (userMap !== undefined) {
      fn(userMap);
    } else {
      throw new Error(`userId: ${userId} was not found in the userMap`);
    }
  }
}
