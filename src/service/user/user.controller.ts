import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { getPayload } from 'src/util/jwt-util';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
  @Get('get-details')
  async getDetails(@Req() req: Request) {
    const payload = getPayload(req);
    return await this.service.getUserDetails(payload.userId);
  }
}
