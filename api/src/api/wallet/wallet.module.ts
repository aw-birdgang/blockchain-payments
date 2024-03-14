import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Group_Apikey,
  Group_Master_Wallet,
  Coin_Address,
  Coin_Address_Register,
  Group_Master_Purse,
  Group_Fee_Wallet,
  Group_Fee_Purse,
} from 'src/entities';
import { CommonService } from 'src/common/common.service';
import {EtherService} from "../ether/ether.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group_Apikey,
      Group_Master_Wallet,
      Coin_Address,
      Coin_Address_Register,
      Group_Master_Purse,
      Group_Fee_Wallet,
      Group_Fee_Purse,
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, EtherService, CommonService],
})
export class WalletModule {}
