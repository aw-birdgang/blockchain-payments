import {Module} from '@nestjs/common';
import {WalletService} from './wallet.service';
import {WalletController} from './wallet.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ClientContainer, Wallet,} from 'src/entities';
import {CommonService} from 'src/common/common.service';
import {EtherService} from "../ether/ether.service";
import {ConfigService} from "../../config";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientContainer,
      Wallet,
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, EtherService, CommonService, ConfigService,],
})
export class WalletModule {}
