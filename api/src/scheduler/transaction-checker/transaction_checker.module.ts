import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ScheduleModule} from "@nestjs/schedule";
import {ConfigService} from "../../config";
import {DepositWalletService} from "../../api/deposit-wallet/deposit-wallet.service";
import {BlockInfo} from "../../entities/ethereum_block_info.entity";
import {EthereumTransactionDelivery} from "../../entities/ethereum_transaction_delivery.entity";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([
            BlockInfo,
            EthereumTransactionDelivery,
        ]),
    ],
    providers: [ConfigService, DepositWalletService,],
})
export class TransactionCheckerModule {}
