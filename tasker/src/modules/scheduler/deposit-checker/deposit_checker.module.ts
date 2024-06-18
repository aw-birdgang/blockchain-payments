import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositCheckerService } from './deposit_checker.service';
import { ConfigService } from '../../config';
import { ScheduleModule } from '@nestjs/schedule';
import { EthereumDepositTransactions, Wallet } from 'entities/src/entities';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Wallet, EthereumDepositTransactions]),
  ],
  providers: [ConfigService, DepositCheckerService],
})
export class DepositCheckerModule {}
