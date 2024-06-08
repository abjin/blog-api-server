import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  @Inject() private readonly authService: AuthService;

  async validate(username: string, password: string) {
    const account = await this.authService.signIn(username, password);
    return account ? { username: account.username } : null;
  }
}
