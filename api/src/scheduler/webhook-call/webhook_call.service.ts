import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import {
  GroupWebhookCall,
  GroupApikey,
  EthereumDepositTransactions, Common_Code, CoinAddress,
} from '../../entities';
import { DepositTransactions } from 'src/api/wallet/dto/request-deposit-transactions.dto';
import axios from 'axios';
import {Interval} from "@nestjs/schedule";

/**
 * 블록체인 내에서 입금내역을 고객사들에게 웹훅으로 알려준다.
 * : 최대 5회 웹훅 호출하도록 한다. [성공 : 200, 201]
 */
@Injectable()
export class WebhookCallService {
  private readonly logger = new Logger(WebhookCallService.name);

  private processing: boolean = false;

  constructor(
    @InjectRepository(GroupWebhookCall)
    private GroupWebhookCallRepository: Repository<GroupWebhookCall>,
    @InjectRepository(GroupApikey)
    private GroupApikeyRepository: Repository<GroupApikey>,
    @InjectRepository(EthereumDepositTransactions)
    private EthereumDepositTransactionsRepository: Repository<EthereumDepositTransactions>,
  ) {
  }

  async onModuleInit() {
    this.logger.log('onModuleInit()');
  }

  @Interval(10000)
  async checkDepositTransactions() {
    if (this.processing) {
      return;
    }
    this.processing = true;

    try {
      this.logger.log('=== Check Deposit Transactions ===');

      // Ethereum Webhook 호출
      const ethereumTransactions = await this.EthereumDepositTransactionsRepository.find({
        where: { is_sended: 'Y', webhook_success: 'N', webhook_count: LessThan(5) },
      });

      if (ethereumTransactions.length > 0) {
        for await (const tx of ethereumTransactions) {
          const webhook_Url_Data = await this.GroupApikeyRepository.findOne({ where: { group_code: tx.group_code } });
          let webhook_Url = '';

          if (webhook_Url_Data != null) {
            webhook_Url = webhook_Url_Data.webhook_href;
          }

          const group_Webhook_Call = new GroupWebhookCall();
          group_Webhook_Call.network = 'Ethereum';
          group_Webhook_Call.deposit_id = tx.id;
          group_Webhook_Call.webhook_url = webhook_Url;

          console.log('Ethereum : ' + tx.id + ' ==> ' + webhook_Url);

          const ethereumDepositTransactions = new DepositTransactions();
          ethereumDepositTransactions.network = 'Ethereum';
          ethereumDepositTransactions.coin = tx.coin;
          ethereumDepositTransactions.amounts = Number(tx.amounts);
          ethereumDepositTransactions.txhash = tx.txhash;
          ethereumDepositTransactions.from_address = tx.from_address;
          ethereumDepositTransactions.to_address = tx.to_address;
          ethereumDepositTransactions.block_number = tx.block_number;

          await axios
              .post(webhook_Url, ethereumDepositTransactions)
              .then((resp) => {
                console.log(resp.status);
                console.log(resp.data);

                group_Webhook_Call.res_status = resp.status.toString();
                group_Webhook_Call.res_message = JSON.stringify(resp.data);
              })
              .catch((err) => {
                //console.log(err);
                console.log(err.response.status);
                console.log(err.response.data);

                group_Webhook_Call.res_status = err.response.status.toString();
                group_Webhook_Call.res_message = JSON.stringify(err.response.data);
              });

          // 웹훅 처리 데이타 저장
          await this.GroupWebhookCallRepository.save(group_Webhook_Call);

          tx.webhook_count = tx.webhook_count + 1;
          if (group_Webhook_Call.res_status == '200' || group_Webhook_Call.res_status == '201') {
            tx.webhook_success = 'Y';
          }

          // 웹훅 처리 카운트 저장
          await this.EthereumDepositTransactionsRepository.save(tx);
        }
      }
    } finally {
      this.processing = false;
    }
  }

}
