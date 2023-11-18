import { Module } from '@nestjs/common';
import { WebsocketConfigDbModule } from 'src/db/websocket-config/websocket-config.module';
import { WebsocketConfigController } from './websocket-config.controller';
import { WebsocketConfigService } from './websocket-config.service';
import { WebsocketServerModule } from 'src/ws-server/ws-server.module';

@Module({
  imports: [WebsocketConfigDbModule, WebsocketServerModule],
  controllers: [WebsocketConfigController],
  providers: [WebsocketConfigService],
})
export class WebsocketConfigModule {}
