import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ScheduleModule} from "@nestjs/schedule";
import {BlockInfo} from "../../entities/ethereum_block_info.entity";
import {EthereumTransactionDelivery} from "../../entities/ethereum_transaction_delivery.entity";
import {ConfigService} from "../../config";
import {TransactionService} from "../../transaction";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([
            BlockInfo,
            EthereumTransactionDelivery,
        ]),
    ],
    providers: [ConfigService, TransactionService,],
})
export class DeliveryCheckerModule {}
