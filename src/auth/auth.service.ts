import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  public async signUp(username: string, password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await this.hashPassword(password, salt);
    return this.prismaService.localAccount.create({
      data: {
        username,
        password: hashedPassword,
        salt,
      },
    });
  }

  public async signIn(username: string, password: string) {
    const localAccount =
      await this.prismaService.localAccount.findUniqueOrThrow({
        where: { username },
      });

    const hashedPassword = await this.hashPassword(password, localAccount.salt);
    return hashedPassword !== localAccount.password ? null : localAccount;
  }

  public async signJwtToken(username: string) {
    return this.jwtService.signAsync({ username });
  }

  private hashPassword(password: string, salt: string) {
    return new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, key) =>
        err ? reject(err) : resolve(key.toString('hex')),
      );
    });
  }
}
