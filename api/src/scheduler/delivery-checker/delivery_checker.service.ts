import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {Interval} from "@nestjs/schedule";
import {ConfigService} from "../../config";
import {TransactionService} from "../../transaction";

@Injectable()
export class DeliveryCheckerService implements OnModuleInit {

    private readonly logger = new Logger(DeliveryCheckerService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly transactionService: TransactionService,
    ) {}


    async onModuleInit() {
        this.logger.log('onModuleInit()');
        const result = await this.init ();
    }

    async init () {
    }

    @Interval(10000)
    async checkBlock() {
        try {
            await this.transactionService.fetchAndProcessTransactions();
        } catch (error) {
            this.logger.error('Failed to process blocks', error);
        }
    }

}
