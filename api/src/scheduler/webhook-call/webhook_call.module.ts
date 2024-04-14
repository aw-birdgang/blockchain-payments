import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EthereumDepositTransactions, ClientContainer} from 'src/entities';
import {WebhookCallService} from './webhook_call.service';
import {CommonService} from 'src/common/common.service';
import {HttpModule} from '@nestjs/axios';
import {ScheduleModule} from "@nestjs/schedule";
import {WebhookModule} from "../../webhook/webhook.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    WebhookModule,
    TypeOrmModule.forFeature([ ClientContainer, EthereumDepositTransactions, ]),
  ],
  providers: [WebhookCallService, CommonService],
})
export class WebHookCallModule {}
