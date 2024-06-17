import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet, Common_Code, EthereumDepositTransactions } from 'src/entities';
import { DepositCheckerService } from './deposit_checker.service';
import { CommonService } from 'src/common/common.service';
import { ConfigService } from '../../config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Wallet, Common_Code, EthereumDepositTransactions]),
  ],
  providers: [ConfigService, DepositCheckerService, CommonService],
})
export class DepositCheckerModule {}
