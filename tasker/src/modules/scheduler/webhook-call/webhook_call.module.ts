import { Module } from '@nestjs/common';
import { WebhookCallService } from './webhook_call.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WebhookCallService],
})
export class WebHookCallModule {}
