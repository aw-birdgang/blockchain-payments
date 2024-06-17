import { forwardRef, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/entities';
import { CommonService } from 'src/common/common.service';
import { EtherService } from '../ether/ether.service';
import { ConfigService } from '../config';
import { CommonModule } from '../../common/common.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    forwardRef(() => CommonModule),
    forwardRef(() => ClientModule),
    TypeOrmModule.forFeature([Wallet]),
  ],
  controllers: [WalletController],
  providers: [WalletService, EtherService, CommonService, ConfigService],
})
export class WalletModule {}
