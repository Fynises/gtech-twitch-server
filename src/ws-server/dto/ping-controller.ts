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
      console.log('sent ping');
      setTimeout(() => {
        if (!this.isAlive) {
          console.log('clearing interval');
          clearInterval(this.intervalHandle);
          socket.close();
        }
      }, 5000);
    }, 60000);

    socket.on('pong', () => {
      this.isAlive = true;
      console.log('received pong');
    });
  }
}
