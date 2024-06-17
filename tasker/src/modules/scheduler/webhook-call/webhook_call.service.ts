import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import { DepositTransactions } from 'src/dto/wallet-request-deposit-transactions.dto';
import { Interval } from '@nestjs/schedule';
import { Client } from '../../client/entities/client.entity';
import { EthereumDepositTransactions } from '../../../entities';
import { WebhookService } from '../../webhook/webhook.service';

/**
 * 블록체인 내에서 입금내역을 고객사들에게 웹훅으로 알려준다.
 * : 최대 5회 웹훅 호출하도록 한다. [성공 : 200, 201]
 */
@Injectable()
export class WebhookCallService {
  private readonly logger = new Logger(WebhookCallService.name);

  private processing: boolean = false;

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(EthereumDepositTransactions)
    private EthereumDepositTransactionsRepository: Repository<EthereumDepositTransactions>,
    private readonly webhookService: WebhookService,
  ) {}

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
          const webhook_Url_Data = await this.clientRepository.findOne({
            where: { id: tx.clientId },
          });
          const webhook_Url = webhook_Url_Data.webhookUrl ? webhook_Url_Data.webhookUrl : '';
          this.logger.log('Ethereum : ' + tx.id + ' ==> ' + webhook_Url);

          const ethereumDepositTransactions = new DepositTransactions();
          ethereumDepositTransactions.network = 'Ethereum';
          ethereumDepositTransactions.coin = tx.coin;
          ethereumDepositTransactions.amounts = Number(tx.amounts);
          ethereumDepositTransactions.txhash = tx.txhash;
          ethereumDepositTransactions.from_address = tx.from_address;
          ethereumDepositTransactions.to_address = tx.to_address;
          ethereumDepositTransactions.block_number = tx.block_number;

          this.webhookService
            .sendWebhookResponse(webhook_Url, ethereumDepositTransactions)
            .subscribe({
              next: (response) => {
                this.logger.log('Webhook Response Status:', response.status);
                this.logger.log('Webhook Response Data:', JSON.stringify(response.data));
              },
              error: (error) => {
                this.logger.log('Webhook Error:', error);
              },
            });
        }
      }
    } finally {
      this.processing = false;
    }
  }
}
