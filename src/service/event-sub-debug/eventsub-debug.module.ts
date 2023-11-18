import { Module } from '@nestjs/common';
import { EventSubModule } from 'src/event-sub/event-sub.module';
import { EventSubDebugService } from './eventsub-debug.service';
import { EventSubDebugController } from './eventsub-debug.controller';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [EventSubModule, DatabaseModule],
  providers: [EventSubDebugService],
  controllers: [EventSubDebugController],
})
export class EventSubDebugModule {}
