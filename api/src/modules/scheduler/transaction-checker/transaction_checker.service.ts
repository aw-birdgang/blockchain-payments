import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import Web3 from 'web3';
import { ConfigService } from '../../config';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockInfo } from '../../entities/ethereum_block_info.entity';
import { DepositWalletService } from '../../modules/deposit-wallet/deposit-wallet.service';
import { EthereumTransactionDelivery } from '../../entities/ethereum_transaction_delivery.entity';

@Injectable()
export class TransactionCheckerService implements OnModuleInit {
  private readonly logger = new Logger(TransactionCheckerService.name);

  private readonly rpcurl: string;
  private web3: any;

  constructor(
    @InjectRepository(EthereumTransactionDelivery)
    private ethereumTransactionDeliveryRepository: Repository<EthereumTransactionDelivery>,
    @InjectRepository(BlockInfo)
    private blockInfoRepository: Repository<BlockInfo>,
    private readonly configService: ConfigService,
    private readonly depositWalletService: DepositWalletService,
  ) {
    this.rpcurl = this.configService.get('ETHEREUM_ENDPOINT');
    this.logger.log('EthereumDepositService > rpcurl : ' + this.rpcurl);
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));
  }

  async onModuleInit() {}

  @Interval(10000)
  async checkBlock() {
    try {
      const sbn = await this.getLastCheckedBlockNumber();
      let cbn = await this.web3.eth.getBlockNumber();
      if (cbn < sbn) {
        cbn = sbn;
      }
      for (let blockNumber = sbn; blockNumber <= cbn; blockNumber++) {
        const block = await this.web3.eth.getBlock(blockNumber, true);
        const transactions = block.transactions.filter(
          (tx) => this.isDepositAddress(tx.to) && tx.status,
        );
        if (transactions.length) {
          await this.saveTransactions(transactions);
        }
      }
      await this.updateLastCheckedBlockNumber(cbn);
    } catch (error) {
      this.logger.error('Failed to process blocks', error);
    }
  }

  /**
   * 데이터베이스에서 마지막으로 확인된 블록 번호를 가져옵니다.
   * @returns {Promise<number>} 마지막으로 확인된 블록 번호
   */
  async getLastCheckedBlockNumber(): Promise<number> {
    // 데이터베이스에서 마지막으로 확인된 블록 번호를 가져오는 로직
    const lastBlock = await this.blockInfoRepository.findOne({
      order: { checkedAt: 'DESC' },
    });
    return lastBlock ? lastBlock.number : 0; // 만약 저장된 블록이 없다면 0을 반환
  }

  /**
   * 주어진 주소가 클라이언트의 입금 주소 인지 확인 합니다.
   * @param {string} address 확인할 주소
   * @returns {Promise<boolean>} 해당 주소가 입금 주소일 경우 true
   */
  async isDepositAddress(address: string): Promise<boolean> {
    // 주어진 주소가 입금 주소 목록에 속하는지 확인
    const client = this.depositWalletService.isDepositAddress(address);
    return !!client; // 클라이언트가 존재하면 true, 그렇지 않으면 false 반환
  }

  /**
   * 필터링된 트랜잭션들을 데이터베이스에 저장합니다.
   * @param {any[]} transactions 저장할 트랜잭션 배열
   * @returns {Promise<void>}
   */
  async saveTransactions(transactions: any[]): Promise<void> {
    for (const tx of transactions) {
      try {
        const receipt = await this.web3.eth.getTransactionReceipt(tx.hash);
        if (receipt) {
          const depositWallet = await this.depositWalletService.findDepositWalletByAddress(tx.to);
          const clientId = null != depositWallet ? depositWallet.clientId : '';
          const transactionDelivery = this.ethereumTransactionDeliveryRepository.create({
            transactionHash: receipt.transactionHash,
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber,
            from: tx.from, // 트랜잭션 정보에서 가져옴
            to: tx.to, // 트랜잭션 정보에서 가져옴
            gasUsed: receipt.gasUsed,
            // cumulativeGasUsed: receipt.cumulativeGasUsed,
            gasPrice: tx.gasPrice, // 트랜잭션 정보에서 가져옴
            contractAddress: receipt.contractAddress || null, // 계약 생성이 없는 경우 null
            status: receipt.status === true, // 영수증에서 상태를 boolean으로 변환
            priority: 5,
            delivered: 'pending',
            clientId: clientId,
            timestamp: new Date(), // 현재 시각
          });
          await this.ethereumTransactionDeliveryRepository.save(transactionDelivery);
        }
      } catch (error) {
        this.logger.error(`Failed to process transaction ${tx.hash}: ${error.message}`);
      }
    }
  }

  /**
   * 데이터베이스에 마지막 으로 확인된 블록 번호를 업데이트 합니다.
   * @param {number} blockNumber 업데이트할 블록 번호
   * @returns {Promise<void>}
   */
  async updateLastCheckedBlockNumber(blockNumber: number): Promise<void> {
    const blockInfo = this.blockInfoRepository.create({
      number: blockNumber,
      checkedAt: new Date(),
    });
    await this.blockInfoRepository.save(blockInfo);
  }
}
