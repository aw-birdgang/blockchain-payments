import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModuleConfig } from './modules/swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정 추가
  SwaggerModuleConfig.setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
