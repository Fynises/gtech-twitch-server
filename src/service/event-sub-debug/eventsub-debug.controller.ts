import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { EventSubDebugService } from './eventsub-debug.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { getPayload } from 'src/util/jwt-util';

@Controller('eventsub-debug')
export class EventSubDebugController {
  constructor(private readonly service: EventSubDebugService) {}

  @UseGuards(AuthGuard)
  @Post('reset')
  async reset(@Req() req: Request): Promise<void> {
    const payload = getPayload(req);
    await this.service.reset(payload.userId);
  }
}
