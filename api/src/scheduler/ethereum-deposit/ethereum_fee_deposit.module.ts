import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Common_Code, GroupFeeWallet, Group_Fee_Purse_History } from 'src/entities';
import { EthereumFeeDepositService } from './ethereum_fee_deposit.service';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([Common_Code, GroupFeeWallet, Group_Fee_Purse_History])],
  providers: [EthereumFeeDepositService, CommonService],
})
export class EthereumFeeDepositModule {}
