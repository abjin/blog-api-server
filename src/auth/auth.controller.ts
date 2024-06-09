import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountRequestBodyDto } from './auth.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateAccountResponseDto } from './auth.response.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAuth(@Req() req: Request & { user: { username: string } }) {
    return req.user;
  }

  @Post('accounts')
  async signUp(
    @Body() { username, password }: CreateAccountRequestBodyDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CreateAccountResponseDto> {
    const localAccount = await this.authService.signUp(username, password);
    await this.authService.setWebToken(res, localAccount.username);
    return new CreateAccountResponseDto(localAccount);
  }

  @UseGuards(AuthGuard('local'))
  @Post('local-login')
  postAdminLogin(
    @Req() req: Request & { user: any },
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.authService.setWebToken(res, req.user.username);
  }
}
