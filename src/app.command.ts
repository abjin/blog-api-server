import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Command } from 'nestjs-command';

@Injectable()
export class AppCommand {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Command({ command: 'deploy' })
  async deploy() {
    const res = await this.httpService.axiosRef.post(
      `https://app.koyeb.com/v1/services/${this.configService.getOrThrow('KOYEB_SERVICE_ID')}/redeploy`,
      {},
      {
        headers: {
          Authorization: this.configService.getOrThrow('KOYEB_API_KEY'),
        },
      },
    );

    console.log(res.data);
    console.log('deploy success 💫');
  }
}
