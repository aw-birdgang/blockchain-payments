import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Coin_Address,
  Coin_Address_Register,
  Common_Code,
  Ethereum_Deposit_Transactions,
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
      Coin_Address,
      Coin_Address_Register,
      Common_Code,
      Ethereum_Deposit_Transactions,
      Polygon_Deposit_Transactions,
    ]),
  ],
  providers: [ConfigService, DepositCheckerService, CommonService],
})
export class DepositCheckerModule {}
