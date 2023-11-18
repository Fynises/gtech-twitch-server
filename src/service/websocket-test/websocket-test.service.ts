import { Injectable } from '@nestjs/common';
import { StandardMessage } from 'src/ws-server/dto/standard-message';
import { WebsocketManagerService } from 'src/ws-server/websocket-manager.service';

@Injectable()
export class WebsocketTestService {
  constructor(private wsManager: WebsocketManagerService) {}

  handleTest(userId: string, duration: number, power: number): void {
    const standardMessage = new StandardMessage(duration, power / 100.0);
    this.wsManager.sendMessage(userId, standardMessage);
  }
}
