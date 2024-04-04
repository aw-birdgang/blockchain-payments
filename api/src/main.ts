import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "./config";
import {setupSwagger} from "./common/util/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  process.env.NODE_ENV = configService.get('APP_ENV');

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
