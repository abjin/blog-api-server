import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  app.use(
    ['/api-docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_USERNAME')]:
          configService.get('SWAGGER_PASSWORD'),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('kg-telecome api sever')
    .setDescription('The kg-telecome API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(port);

  console.log({ port, data: new Date() });
}
bootstrap().catch(console.log);
