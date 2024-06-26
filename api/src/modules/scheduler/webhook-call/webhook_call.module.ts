import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthereumDepositTransactions, Client } from 'src/entities';
import { WebhookCallService } from './webhook_call.service';
import { CommonService } from 'src/common/common.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { WebhookModule } from '../../modules/webhook/webhook.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    WebhookModule,
    TypeOrmModule.forFeature([Client, EthereumDepositTransactions]),
  ],
  providers: [WebhookCallService, CommonService],
})
export class WebHookCallModule {}
