import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet, Common_Code, EthereumDepositTransactions } from 'src/entities';
import { EthereumDepositService } from './ethereum_deposit.service';
import { CommonService } from 'src/common/common.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigService } from '../../config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Wallet, Common_Code, EthereumDepositTransactions]),
  ],
  providers: [ConfigService, CommonService, EthereumDepositService],
})
export class EthereumDepositModule {}
