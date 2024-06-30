import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { useSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableShutdownHooks();
  configService.getOrThrow('NODE_ENV') !== 'production' && useSwagger(app);

  const origins: string[] = getOriginWhitelist();
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200,
  });

  await app.listen(port);
  return { port, data: new Date() };
}
bootstrap().then(console.log).catch(console.log);

function getOriginWhitelist(): string[] {
  return [
    'https://localhost:5173',
    'http://localhost:5173',
    'https://kg-telecome.web.app',
    'http://kg-telecome.web.app',
  ];
}
