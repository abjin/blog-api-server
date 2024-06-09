import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { name as packageName } from '../package.json';

export function useSwagger(app: INestApplication, path = 'api-docs') {
  const configService = app.get(ConfigService);
  app.use(
    [`/${path}`],
    expressBasicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_USERNAME')]:
          configService.get('SWAGGER_PASSWORD'),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(`${packageName}`)
    .setDescription(`${packageName} description`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${path}`, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}
