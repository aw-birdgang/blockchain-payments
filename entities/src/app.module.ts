import {Module} from '@nestjs/common';
import {ConfigModule} from "./modules/config";
import {MySQLModule} from "./modules/database/mysql.module";

@Module({
  imports: [
    MySQLModule,
    ConfigModule,
  ],
})
export class AppModule {}
