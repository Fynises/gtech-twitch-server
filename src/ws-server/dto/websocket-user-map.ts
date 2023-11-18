import { WebSocket } from 'ws';
import { WebSocketSession } from './websocket-session';
import { Logger } from '@nestjs/common';

/**
 * object managing websocket sessions for a single user
 */
export class WebSocketUserMap {
  private readonly log = new Logger(WebSocketUserMap.name);
  /**
   * keep value of userId for debug purposes
   */
  private readonly userId: string;

  private sessions: Map<string, WebSocket>;

  constructor(userId: string, socket: WebSocketSession) {
    this.userId = userId;
    this.sessions = new Map();
    this.sessions.set(socket.sessionUid, socket.socket);
  }

  addSession(newSession: WebSocketSession): void {
    this.sessions.set(newSession.sessionUid, newSession.socket);
  }

  removeSession(sessionId: string): void {
    const deleteResult = this.sessions.delete(sessionId);
    if (!deleteResult) {
      throw new Error(
        `attempted to delete session from WebSocketUserMap user: ${this.userId} sessionId: ${sessionId}`,
      );
    } else {
      this.log.log(`successfully removed sessionId: ${sessionId} from map`);
    }
  }

  isEmpty(): boolean {
    return this.sessions.size === 0;
  }

  /**
   * sends a message to all websocket sessions of this user
   * @param message message to be sent, must be in JSON string format
   */
  sendMessage(message: string): void {
    for (const session of this.sessions.values()) {
      session.send(message, (err) => {
        if (err !== undefined && err !== null) {
          this.log.error(`error occurred sending message: ${err}`);
        }
      });
    }
  }
}
