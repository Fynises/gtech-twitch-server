import {
  Controller,
  Get,
  UseGuards,
  Req,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { CustomRewardsService } from './custom-rewards.service';
import { ActivationParamResponse } from './dto/activation-params-response';
import { ActivationParamRequest } from './dto/activation-param-request';
import { CustomRewardResponse } from './dto/custom-reward-response';
import { CreateActivationConfigReq } from './dto/create-activation-config-req';
import { ChannelRewardDto } from 'src/db/channel-reward-configuration/dto/channel-reward-dto';
import { getPayload } from 'src/util/jwt-util';

@Controller('custom-rewards')
export class CustomRewardsController {
  constructor(private readonly rewardsService: CustomRewardsService) {}

  @UseGuards(AuthGuard)
  @Get('get-all')
  async getAll(@Req() req: Request): Promise<CustomRewardResponse> {
    const payload: JwtPayload = req['auth_payload'];
    const rewards = await this.rewardsService.getAll(payload.userId);
    return new CustomRewardResponse(rewards);
  }

  @UseGuards(AuthGuard)
  @Post('get-activation-params')
  async getActivationParams(
    @Body() body: ActivationParamRequest,
  ): Promise<ActivationParamResponse> {
    return await this.rewardsService.getActivationParams(body.query);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async updateSingle(@Body() body: ChannelRewardDto) {
    return await this.rewardsService.update(body);
  }

  @UseGuards(AuthGuard)
  @Post('create-activation-config')
  async createActivationConfig(
    @Req() req: Request,
    @Body() body: CreateActivationConfigReq,
  ): Promise<ChannelRewardDto> {
    const payload = getPayload(req);
    return await this.rewardsService.createNewActivationParam(
      body.configId,
      payload.userId,
    );
  }
}
