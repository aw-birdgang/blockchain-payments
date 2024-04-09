import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GroupWebhookCall,
  GroupApikey,
  EthereumDepositTransactions
} from 'src/entities';
import { WebhookCallService } from './webhook_call.service';
import { CommonService } from 'src/common/common.service';
import { HttpModule } from '@nestjs/axios';
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    TypeOrmModule.forFeature([GroupWebhookCall, GroupApikey, EthereumDepositTransactions, ]),
  ],
  providers: [WebhookCallService, CommonService],
})
export class WebHookCallModule {}
