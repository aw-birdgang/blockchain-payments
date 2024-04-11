import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Wallet, GroupContainer,
} from 'src/entities';
import { CommonService } from 'src/common/common.service';
import {EtherService} from "../ether/ether.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupContainer,
      Wallet,
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, EtherService, CommonService],
})
export class WalletModule {}
