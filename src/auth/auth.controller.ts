import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAccountRequestBodyDto,
  LoginRequestBodyDto,
} from './auth.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '인증 정보 조회' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAuth(@Req() req: Request & { user: { username: string } }) {
    return req.user;
  }

  @ApiOperation({ summary: '회원 가입' })
  @ApiBody({ type: CreateAccountRequestBodyDto })
  @Post('accounts')
  async signUp(
    @Body() { username, password }: CreateAccountRequestBodyDto,
  ): Promise<{ user: { username: string }; token: string }> {
    await this.authService.signUp(username, password);
    const token = await this.authService.signJwtToken(username);
    return { user: { username }, token };
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginRequestBodyDto })
  @UseGuards(AuthGuard('local'))
  @Post('local-login')
  async postAdminLogin(
    @Req() req: Request & { user: any },
  ): Promise<{ user: { username: string }; token: string }> {
    const token = await this.authService.signJwtToken(req.user.username);
    return { user: req.user, token };
  }
}
