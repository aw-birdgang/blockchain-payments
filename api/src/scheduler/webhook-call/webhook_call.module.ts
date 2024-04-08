import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Group_Webhook_Call,
  Group_Apikey,
  Polygon_Deposit_Transactions,
  EthereumDepositTransactions
} from 'src/entities';
import { WebhookCallService } from './webhook_call.service';
import { CommonService } from 'src/common/common.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Group_Webhook_Call, Group_Apikey, EthereumDepositTransactions, Polygon_Deposit_Transactions]),
  ],
  providers: [WebhookCallService, CommonService],
})
export class WebHookCallModule {}
