import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Module({})
export class SwaggerModuleConfig {
    static setupSwagger(app: INestApplication): void {
        const config = new DocumentBuilder()
            .setTitle('My NestJS Project')
            .setDescription('API documentation for my NestJS project')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    }
}
