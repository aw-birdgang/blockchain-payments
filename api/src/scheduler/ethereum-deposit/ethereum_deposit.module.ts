import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Coin_Address, Coin_Address_Register, Common_Code, Ethereum_Deposit_Transactions} from 'src/entities';
import {EthereumDepositService} from './ethereum_deposit.service';
import {CommonService} from 'src/common/common.service';
import {ScheduleModule} from "@nestjs/schedule";
import {ConfigService} from "../../config";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
        Coin_Address,
        Coin_Address_Register,
        Common_Code,
        Ethereum_Deposit_Transactions
      ]
    ),
  ],
  providers: [ConfigService, CommonService, EthereumDepositService,],
})
export class EthereumDepositModule {}
