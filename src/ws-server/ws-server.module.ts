import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { WebsocketManagerService } from './websocket-manager.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EventsGateway, WebsocketManagerService],
  exports: [EventsGateway, WebsocketManagerService],
})
export class WebsocketServerModule {}
