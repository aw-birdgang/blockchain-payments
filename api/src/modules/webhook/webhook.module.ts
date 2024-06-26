import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], // 여기에 추가
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
