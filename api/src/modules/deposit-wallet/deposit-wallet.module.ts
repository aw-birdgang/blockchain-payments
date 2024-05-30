import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositWalletService } from './deposit-wallet.service';
import { DepositWalletController } from './deposit-wallet.controller';
import { ClientWallet } from './entities/deposit-wallet.entity';

@Module({
  imports: [forwardRef(() => CommonModule), TypeOrmModule.forFeature([ClientWallet])],
  providers: [DepositWalletService],
  controllers: [DepositWalletController],
  exports: [DepositWalletService],
})
export class DepositWalletModule {}
