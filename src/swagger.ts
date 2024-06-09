import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

export function useSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
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
}
