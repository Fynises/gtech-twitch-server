import {
  Controller,
  Logger,
  Req,
  UseGuards,
  Get,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { WebsocketConfigService } from './websocket-config.service';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { getPayload } from 'src/util/jwt-util';

@Controller('websocket-config')
export class WebsocketConfigController {
  private readonly _log = new Logger(WebsocketConfigController.name);
  constructor(private readonly service: WebsocketConfigService) {}

  /**
   * API to get current websocket UID for display to website
   * @returns plain text response
   */
  @UseGuards(AuthGuard)
  @Get('get')
  async get(@Req() req: Request): Promise<string> {
    const payload = getPayload(req);
    const res = await this.service.get(payload.userId);
    if (res !== null) {
      return res;
    } else {
      throw new InternalServerErrorException('could not get socket UID');
    }
  }

  /**
   * API to update websocket UID and returns new value
   * @returns plain text response containing new UID
   */
  @UseGuards(AuthGuard)
  @Put('update')
  async update(@Req() req: Request): Promise<string> {
    const payload = getPayload(req);
    return await this.service.update(payload.userId);
  }
}
