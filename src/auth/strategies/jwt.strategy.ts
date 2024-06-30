import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (request: Request) =>
        request?.headers?.authorization?.replace('Bearer ', ''),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: { username: string }) {
    return payload?.username && { username: payload.username };
  }
}
