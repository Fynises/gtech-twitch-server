import { Module } from '@nestjs/common';
import { WebsocketConfigDbModule } from 'src/db/websocket-config/websocket-config.module';
import { WebsocketConfigController } from './websocket-config.controller';
import { WebsocketConfigService } from './websocket-config.service';

@Module({
  imports: [WebsocketConfigDbModule],
  controllers: [WebsocketConfigController],
  providers: [WebsocketConfigService],
})
export class WebsocketConfigModule {}
