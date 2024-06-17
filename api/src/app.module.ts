import {Module} from '@nestjs/common';
import {MySQLModule} from './modules/database/mysql.module';
import {ERC20Module} from './modules/erc20/erc20.module';
import {WebhookModule} from './modules/webhook/webhook.module';
import {ClientModule} from './modules/client/client.module';
import {EtherModule} from './modules/ether/ether.module';
import {WalletModule} from './modules/wallet/wallet.module';

@Module({
  imports: [
    MySQLModule,
    EtherModule,
    ClientModule,
    WalletModule,
    ERC20Module,
    WebhookModule,
  ],
})
export class AppModule {}
