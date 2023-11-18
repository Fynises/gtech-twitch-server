import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketConfigEntity } from './websocket-config.entity';
import { WebsocketConfigDbService } from './websocket-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebsocketConfigEntity])],
  providers: [WebsocketConfigDbService],
  exports: [WebsocketConfigDbService],
})
export class WebsocketConfigDbModule {}
