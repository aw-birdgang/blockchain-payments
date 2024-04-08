import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CoinAddress,
  CoinAddressRegister,
  Common_Code,
  EthereumDepositTransactions,
  Polygon_Deposit_Transactions,
} from 'src/entities';
import { DepositCheckerService } from './deposit_checker.service';
import { CommonService } from 'src/common/common.service';
import {ConfigService} from "../../config";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      CoinAddress,
      CoinAddressRegister,
      Common_Code,
      EthereumDepositTransactions,
      Polygon_Deposit_Transactions,
    ]),
  ],
  providers: [ConfigService, DepositCheckerService, CommonService],
})
export class DepositCheckerModule {}
