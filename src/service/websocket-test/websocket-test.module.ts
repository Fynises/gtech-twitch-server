import { Module } from '@nestjs/common';
import { WebsocketTestService } from './websocket-test.service';
import { WebsocketTestController } from './websocket-test.controller';
import { WebsocketServerModule } from 'src/ws-server/ws-server.module';

@Module({
  imports: [WebsocketServerModule],
  controllers: [WebsocketTestController],
  providers: [WebsocketTestService],
})
export class WebsocketTestModule {}
