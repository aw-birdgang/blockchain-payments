import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin_Address, Coin_Address_Register, Common_Code, Ethereum_Deposit_Transactions } from 'src/entities';
import { EthereumDepositService } from './ethereum_deposit.service';
import { ERC20DepositService } from './erc20_deposit.service';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coin_Address, Coin_Address_Register, Common_Code, Ethereum_Deposit_Transactions])],
  providers: [EthereumDepositService, ERC20DepositService, CommonService],
})
export class EthereumDepositModule {}
