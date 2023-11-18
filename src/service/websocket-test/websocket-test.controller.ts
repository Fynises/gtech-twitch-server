import { Controller, Logger, UseGuards, Post, Req, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { TestRequestBody } from './dto/test-request-body';
import { WebsocketTestService } from './websocket-test.service';
import { getPayload } from 'src/util/jwt-util';
import { instanceToPlain } from 'class-transformer';

@Controller('websocket-test')
export class WebsocketTestController {
  private readonly _log = new Logger(WebsocketTestController.name);
  constructor(private readonly service: WebsocketTestService) {}

  @UseGuards(AuthGuard)
  @Post('test')
  async test(
    @Req() req: Request,
    @Body() body: TestRequestBody,
  ): Promise<void> {
    const payload = getPayload(req);
    this._log.log(`received test: ${JSON.stringify(instanceToPlain(body))}`);
    this.service.handleTest(payload.userId, body.duration, body.power);
  }
}
