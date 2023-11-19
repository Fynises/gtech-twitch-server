import { WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { PingController } from './ping-controller';

const URL_PREFIX = '/ws';

/**
 * data object containing relevant data about a websocket connection
 */
export class WebSocketSession {
  socket: WebSocket; // websocket session proper
  authKey: string; // authenticating key: used to identify user connecting
  sessionUid: string; // UUID uniquely identifying this session
  pingController: PingController;

  constructor(socket: WebSocket, url: string | undefined) {
    this.socket = socket;
    this.authKey = WebSocketSession.parseUrl(url);
    this.sessionUid = uuidv4();
    this.pingController = new PingController(socket);
  }

  private static parseUrl(url: string | undefined): string {
    if (url === undefined) {
      throw new Error('socket connection URL was not found');
    }
    const paramOnly = url.split(URL_PREFIX)[1];
    if (paramOnly === null) {
      // eslint-disable-next-line prettier/prettier
      throw new Error(`error occurred transforming socket connection url: ${url}`);
    }
    const urlParams = new URLSearchParams(paramOnly);
    const socketUid = urlParams.get('id');
    if (socketUid !== null) {
      return socketUid;
    } else {
      throw new Error(`socket uid was null from ${socketUid}`);
    }
  }

  /**
   * shortcut to close the session
   */
  closeSocket(): void {
    this.socket.close();
  }

  toString(): string {
    return `WebSocketSession {\
      socket: ${this.socket},\
      authKey: ${this.authKey},\
      sessionUid: ${this.sessionUid}\
    }`;
  }
}
