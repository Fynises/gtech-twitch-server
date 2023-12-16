import { WebSocket } from 'ws';

/**
 * Creates a pinging controller for the websocket connection
 */
export class PingController {
  intervalHandle: NodeJS.Timeout;
  isAlive: boolean;

  constructor(socket: WebSocket) {
    this.isAlive = true;
    this.intervalHandle = setInterval(() => {
      this.isAlive = false;
      socket.ping();
      setTimeout(() => {
        if (!this.isAlive) {
          clearInterval(this.intervalHandle);
          socket.close();
        }
      }, 5000);
    }, 30000);

    socket.on('pong', () => {
      this.isAlive = true;
    });
  }
}
