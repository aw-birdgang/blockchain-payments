import {Injectable, Logger} from '@nestjs/common';
import {CommonService} from 'src/common/common.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Interval} from '@nestjs/schedule';

// Entities
import {EthereumDepositTransactions} from '../../entities';

/**
 * 입금 내역 확인 서비스
 * : 블록 체인 입금 내역을 읽어서 자산 입금 처리
 * : 수수료 지갑 에서 수수료 차감 후
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
  }
}
