import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group_Webhook_Call, Group_Apikey, Ethereum_Deposit_Transactions, Polygon_Deposit_Transactions } from 'src/entities';
import { WebhookCallService } from './webhook_call.service';
import { CommonService } from 'src/common/common.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Group_Webhook_Call, Group_Apikey, Ethereum_Deposit_Transactions, Polygon_Deposit_Transactions]),
  ],
  providers: [WebhookCallService, CommonService],
})
export class WebHookCallModule {}
