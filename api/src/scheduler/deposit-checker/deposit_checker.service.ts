import { Injectable, Logger } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interval } from '@nestjs/schedule';

// Entities
import {EthereumDepositTransactions, Polygon_Deposit_Transactions} from '../../entities';

/**
 * 입금내역 확인 서비스
 * : 블록체인 입금내역을 읽어서 자산입금처리
 * : 수수료 지갑에서 수수료 차감 후
 * : 마스터 지갑에 자산 추가
 */
@Injectable()
export class DepositCheckerService {
  private readonly logger = new Logger(DepositCheckerService.name);

  private processing: boolean = false;

  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(EthereumDepositTransactions)
    private EthereumDepositTransactionsRepository: Repository<EthereumDepositTransactions>,
  ) {
  }

  // 입금내역 확인
  @Interval(10000)
  async checkDepositTransactions() {
    this.logger.log('checkDepositTransactions > processing : ' + this.processing);
    if (this.processing) {
      return;
    }
    this.processing = true;

    try {
      // Ethereum 블록체인 입금처리 [수수료 차감]
      const ethereumTransactions = await this.EthereumDepositTransactionsRepository.find({ where: { is_sended: 'N' } });
      if (ethereumTransactions.length > 0) {
        for await (const tx of ethereumTransactions) {
          const group_code = tx.group_code;
          this.logger.log('Ethereum : ' + tx.id + ' Fee => ' + tx.amounts);

          // 수수료 잔고
          const etherFeePurse = await this.commonService.getFeePurse(group_code, 'Ethereum', 'Ether');
          // 수수료 조회
          const etherFee = await this.commonService.selectCommonCode('ethereum_deposit_fee');

          if (etherFeePurse == 0) {
            this.logger.error(tx.id + '] Ether 수수료 부족 [수수료 지갑 : ' + etherFeePurse + ' (' + group_code + ')]');
          } else if (etherFeePurse >= etherFee) {
            // 수수료 차감
            const feeData = await this.commonService.deposit_fee_purse(group_code, 'Ethereum', 'Ether', -1 * etherFee, tx.txhash, '');

            if (feeData == true) {
              tx.is_sended = 'F';
              await this.EthereumDepositTransactionsRepository.save(tx);
            }
          } else {
            this.logger.error(tx.id + '] Ether 수수료 부족 [수수료 지갑 : ' + etherFeePurse + ' (' + group_code + ')]');
          }
        }
      }

      // Ethereum 블록체인 입금처리 [마스터 지갑 입금]
      const ethereumTransactionsFees = await this.EthereumDepositTransactionsRepository.find({ where: { is_sended: 'F' } });
      if (ethereumTransactionsFees.length > 0) {
        for await (const tx of ethereumTransactionsFees) {
          const group_code = tx.group_code;
          const coin = tx.coin;
          const amounts = tx.amounts;
          this.logger.log('Ethereum : ' + tx.id + ' Deposit => ' + tx.amounts);

          // 마스터지갑 입금처리
          const rtnData = await this.commonService.deposit_master_purse(group_code, 'Ethereum', coin, amounts, tx.txhash, '');
          if (rtnData == true) {
            tx.is_sended = 'Y';
            await this.EthereumDepositTransactionsRepository.save(tx);
          }
        }
      }
    } finally {
      this.processing = false;
    }
  }
}
