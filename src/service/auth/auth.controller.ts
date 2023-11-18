import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginRequest from './dto/login-request';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  private readonly log = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginRequest): Promise<string> {
    try {
      return await this.authService.login(data);
    } catch (e) {
      this.log.error(`${e}`);
      throw e;
    }
  }

  /**
   * simple route to validate JWT
   * @returns void (200 status code on successful validation)
   */
  @UseGuards(AuthGuard)
  @Get('validate')
  async validate(): Promise<void> {
    return;
  }
}
