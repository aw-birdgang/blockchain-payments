// src/transaction/transaction.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { EthereumTransactionDelivery } from '../../entities/ethereum_transaction_delivery.entity';
import { ClientService } from '../client/client.service';
import axios from 'axios';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(EthereumTransactionDelivery)
    private ethereumTransactionDeliveryRepository: Repository<EthereumTransactionDelivery>,
    private readonly clientService: ClientService,
  ) {}

  private readonly logger = new Logger(TransactionService.name);

  async fetchAndProcessTransactions(): Promise<void> {
    const transactions = await this.ethereumTransactionDeliveryRepository.find({
      where: {
        delivered: 'pending',
        priority: MoreThan(5), // 예시: 우선 순위가 5 이상인 트랜잭션만 가져온다고 가정
      },
    });

    for (const transaction of transactions) {
      if (transaction.delivered !== 'delivered') {
        const client = await this.clientService.findById(transaction.clientId);
        if (client && client.webhookUrl) {
          try {
            // 전달 로직: 클라이언트의 webhook URL로 트랜잭션 데이터를 POST 요청
            await axios.post(client.webhookUrl, {
              transactionId: transaction.id,
              from: transaction.from,
              to: transaction.to,
              amount: transaction.value,
              delivered: transaction.delivered,
            });
            transaction.delivered = 'delivered'; // 전송 성공 시 상태 업데이트
            this.logger.log(`Transaction ${transaction.id} delivered to client ${client.id}`);
          } catch (error) {
            this.logger.error(
              `Failed to deliver transaction ${transaction.id} to client ${client.id}: ${error.message}`,
            );
            transaction.delivered = 'failed';
          }
          await this.ethereumTransactionDeliveryRepository.save(transaction);
        }
      }
    }
  }
}
