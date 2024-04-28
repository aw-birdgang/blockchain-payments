import {Module} from '@nestjs/common';
import {MySQLModule} from "./database/mysql.module";
import {ConfigModule} from "./config";
import {ERC20Module} from "./api/erc20/erc20.module";
import {CommonModule} from "./common/common.module";
import {WebhookModule} from './webhook/webhook.module';
import {ClientModule} from './api/client/client.module';
import {EtherModule} from "./api/ether/ether.module";
import {WalletModule} from "./api/wallet/wallet.module";

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
