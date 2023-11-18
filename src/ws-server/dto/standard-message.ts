import { instanceToPlain } from 'class-transformer';
import { WebSocketMessageBody } from 'src/util/websocket-message-body';

export class StandardMessage implements WebSocketMessageBody {
  duration: number; // integer in seconds
  magnitude: number; // float between 0.0 - 1.0

  constructor(duration: number, magnitude: number) {
    this.duration = duration;
    this.magnitude = magnitude;
  }

  toJsonString(): string {
    const plain = instanceToPlain(this);
    return JSON.stringify(plain);
  }
}
