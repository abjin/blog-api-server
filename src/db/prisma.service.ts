import { EmailService } from '@libs/email';
import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  constructor(private readonly configService: ConfigService) {
    super({
      datasources: { db: { url: configService.getOrThrow('DATABASE_URL') } },
    });
  }

  @Inject() private readonly emailService: EmailService;

  async onModuleInit() {
    await this.$connect();
  }

  async onApplicationShutdown(signal: string) {
    await this.emailService.sendEmail({
      to: this.configService.get('GMAIL_USERNAME'),
      subject: 'onApplicationShutdown 테스트',
      html: 'onApplicationShutdown 테스트 <br/>TODO backup sqlite',
    });
    console.log(signal); // e.g. "SIGINT"
  }
}
