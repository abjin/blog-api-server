import { NestFactory } from '@nestjs/core';
import {
  CommandModule as NestJsCommandModule,
  CommandService as NestJsCommandService,
} from 'nestjs-command';
import { CommandModule } from './command/command.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CommandModule);
  app.enableShutdownHooks();

  try {
    await app.select(NestJsCommandModule).get(NestJsCommandService).exec();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
