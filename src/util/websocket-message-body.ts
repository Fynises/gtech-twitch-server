/**
 * interface representing data that can be sent to websocket clients,
 */
export interface WebSocketMessageBody {
  toJsonString(): string;
}
