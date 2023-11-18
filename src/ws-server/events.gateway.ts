import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import { Server, WebSocket } from 'ws';
import { WebsocketManagerService } from './websocket-manager.service';
import { WebSocketSession } from './dto/websocket-session';

@Injectable()
@WebSocketGateway(3002, { path: '/ws' })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly log = new Logger(EventsGateway.name);

  constructor(private websocketManager: WebsocketManagerService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket, req: IncomingMessage) {
    this.log.log(`new connection: ${client}, ${req.url}`);
    const session = new WebSocketSession(client, req.url);
    this.log.log(`created session: ${session.toString()}`);
    this.websocketManager.register(session).catch((e) => {
      this.log.error(`error occurred registering session: ${e}`);
    });
  }

  handleDisconnect(client: WebSocket) {
    this.log.log(`closed connection: ${client}`);
  }
}
