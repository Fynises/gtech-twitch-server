import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CustomRewardsModule } from './custom-rewards/custom-rewards.module';
import { WebsocketConfigModule } from './websocket-config/websocket-config.module';
import { WebsocketTestModule } from './websocket-test/websocket-test.module';
import { UserModule } from './user/user.module';
import { EventSubDebugModule } from './event-sub-debug/eventsub-debug.module';

const MODULES = [
  AuthModule,
  CustomRewardsModule,
  WebsocketConfigModule,
  WebsocketTestModule,
  UserModule,
  EventSubDebugModule,
];

@Module({
  imports: MODULES,
  exports: MODULES,
})
export class ServiceModule {}
