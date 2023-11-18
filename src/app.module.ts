import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitchApiModule } from './twitch-api/twitch-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule, HttpService } from '@nestjs/axios';
import { DatabaseModule } from './db/database.module';
import { ServiceModule } from './service/service.module';
import ENTITIES from './db/entities';
import { WebsocketServerModule } from './ws-server/ws-server.module';
import { EventSubModule } from './event-sub/event-sub.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: ENTITIES,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE,
      logging: process.env.DB_LOGGING,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    DatabaseModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    EventSubModule,
    TwitchApiModule,
    ServiceModule,
    WebsocketServerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private dataSource: DataSource,
    private httpService: HttpService,
  ) {}
}
