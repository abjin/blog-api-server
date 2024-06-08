import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  public async signUp(username: string, password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await this.hashPassword(password, salt);
    const localAccount = await this.prismaService.localAccount.create({
      data: {
        username,
        password: hashedPassword,
        salt,
      },
    });

    return localAccount;
  }

  public async signIn(username: string, password: string) {
    const localAccount = await this.prismaService.localAccount.findUnique({
      where: { username },
    });
    if (!localAccount) return null;

    const hashedPassword = await this.hashPassword(password, localAccount.salt);
    return hashedPassword !== localAccount.password ? null : localAccount;
  }

  public async setWebToken(res: Response, username: string) {
    const token = await this.jwtService.signAsync({ username });
    res.cookie('token', token, { domain: 'localhost' });
  }

  private hashPassword(password: string, salt: string) {
    return new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, key) =>
        err ? reject(err) : resolve(key.toString('hex')),
      );
    });
  }
}
