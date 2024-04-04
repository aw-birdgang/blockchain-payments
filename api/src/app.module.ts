import {Module} from '@nestjs/common';
import {MySQLModule} from "./database/mysql.module";
import {ConfigModule} from "./config";
import {ERC20Module} from "./api/erc20/erc20.module";
import {CommonModule} from "./common/common.module";

@Module({
  imports: [
    ConfigModule,
    MySQLModule,
    CommonModule,
    ERC20Module,
  ],
})
export class AppModule {}
