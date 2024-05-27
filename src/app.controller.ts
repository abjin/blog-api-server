import { Controller, Get } from '@nestjs/common';
import { randomInt } from 'crypto';

const startedAt = new Date();
const randomNumber = randomInt(0, 100);

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `${startedAt.toISOString()}, ${randomNumber}`;
  }
}
