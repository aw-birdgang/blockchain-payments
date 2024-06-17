import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '../../modules/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get<ConfigService>(ConfigService);
  const version = configService.get('APP_VERSION');
  const env = configService.get('APP_ENV');

  const options = new DocumentBuilder()
    .setTitle(env == 'prod' ? 'PROD API Docs' : 'DEV API Docs')
    .setDescription(env == 'prod' ? 'PROD API description' : 'DEV API description')
    .setVersion(version)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
