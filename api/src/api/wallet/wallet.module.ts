import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GroupApikey,
  GroupMasterWallet,
  CoinAddress,
  CoinAddressRegister,
  Group_Master_Purse,
  GroupFeeWallet,
  GroupFeePurse,
} from 'src/entities';
import { CommonService } from 'src/common/common.service';
import {EtherService} from "../ether/ether.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupApikey,
      GroupMasterWallet,
      CoinAddress,
      CoinAddressRegister,
      Group_Master_Purse,
      GroupFeeWallet,
      GroupFeePurse,
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, EtherService, CommonService],
})
export class WalletModule {}
