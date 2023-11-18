import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.LISTEN_PORT);
}
bootstrap();