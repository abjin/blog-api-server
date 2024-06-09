import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { randomInt } from 'crypto';

const startedAt = new Date().toISOString();
const randomNumber = randomInt(0, 100);

@ApiTags('Health Cheack')
@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Health Cheak API',
    description: 'API Server Health Cheak',
  })
  @Get()
  getHello(): string {
    return `${startedAt}, ${randomNumber}`;
  }
}
