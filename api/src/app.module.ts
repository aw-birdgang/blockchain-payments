import { Module } from '@nestjs/common';
import { MySQLModule } from './modules/database/mysql.module';
import { ConfigModule } from './config';
import { ERC20Module } from './modules/erc20/erc20.module';
import { CommonModule } from './common/common.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { ClientModule } from './modules/client/client.module';
import { EtherModule } from './modules/ether/ether.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { TransfersModule } from './modules/transfers/transfers.module';

@Module({
  imports: [
    ConfigModule,
    MySQLModule,
    CommonModule,
    EtherModule,
    ClientModule,
    WalletModule,
    // EthereumDepositModule,
    // DepositCheckerModule,
    ERC20Module,
    WebhookModule,
  ],
})
export class AppModule {}
