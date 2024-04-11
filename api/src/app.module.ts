import {Module} from '@nestjs/common';
import {MySQLModule} from "./database/mysql.module";
import {ConfigModule} from "./config";
import {ERC20Module} from "./api/erc20/erc20.module";
import {CommonModule} from "./common/common.module";
import {DepositCheckerModule} from "./scheduler/deposit-checker/deposit_checker.module";
import {EthereumDepositModule} from "./scheduler/ethereum-deposit/ethereum_deposit.module";
import {WebhookModule} from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule,
    MySQLModule,
    CommonModule,
    EthereumDepositModule,
    DepositCheckerModule,
    ERC20Module,
    WebhookModule,
  ],
})
export class AppModule {}
