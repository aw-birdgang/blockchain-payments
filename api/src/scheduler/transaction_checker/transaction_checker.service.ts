import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {Interval} from "@nestjs/schedule";
import {Client} from "../../entities";
import {Repository} from "typeorm";
import Web3 from 'web3';
import {ConfigService} from "../../config";
import {CommonService} from "../../common/common.service";
import {EthereumTransactionReceipt} from "../../entities/ethereum_transaction_receipt.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ClientService} from "../../api/client/client.service";

@Injectable()
export class TransactionCheckerService implements OnModuleInit {

    private readonly logger = new Logger(TransactionCheckerService.name);

    private readonly rpcurl: string;
    private web3: any;

    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        @InjectRepository(EthereumTransactionReceipt)
        private transactionRepository: Repository<EthereumTransactionReceipt>,
        @InjectRepository(Block)
        private blockRepository: Repository<Block>,
        private readonly configService: ConfigService,
        private readonly commonService: CommonService,
        private readonly clientService: ClientService,
    ) {
        this.rpcurl = this.configService.get("ETHEREUM_ENDPOINT");
        this.logger.log("EthereumDepositService > rpcurl : " + this.rpcurl);

        this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));
    }


    async onModuleInit() {
        this.logger.log('onModuleInit()');
        const result = await this.init ();
    }

    async init () {
    }


    @Interval(10000)
    async checkBlock() {
        try {
            const sbn = await this.getLastCheckedBlockNumber();
            let cbn = await this.web3.eth.getBlockNumber();
            if (cbn < sbn) {
                cbn = sbn;
            }

            for (let blockNumber = sbn; blockNumber <= cbn; blockNumber++) {
                const block = await this.web3.eth.getBlock(blockNumber, true);
                const transactions = block.transactions.filter(tx =>
                    this.isClientDepositAddress(tx.to) && tx.status);

                if (transactions.length) {
                    await this.saveTransactions(transactions);
                }
            }

            await this.updateLastCheckedBlockNumber(cbn);
        } catch (error) {
            this.logger.error('Failed to process blocks', error);
        }
    }


    /**
     * 데이터베이스에서 마지막으로 확인된 블록 번호를 가져옵니다.
     * @returns {Promise<number>} 마지막으로 확인된 블록 번호
     */
    async getLastCheckedBlockNumber(): Promise<number> {
        const lastBlock = await this.blockRepository.findOne({
            order: { checkedAt: 'DESC' }
        });
        return lastBlock ? lastBlock.number : 0;
    }


    /**
     * 주어진 주소가 클라이언트의 입금 주소인지 확인합니다.
     * @param {string} address 확인할 주소
     * @returns {Promise<boolean>} 해당 주소가 입금 주소일 경우 true
     */
    async isClientDepositAddress(address: string): Promise<boolean> {
        this.clientService.findClientById()
        const client = await this.clientRepository.findOne({
            where: { depositAddresses: address }
        });
        return !!client;
    }


    /**
     * 필터링된 트랜잭션들을 데이터베이스에 저장합니다.
     * @param {any[]} transactions 저장할 트랜잭션 배열
     * @returns {Promise<void>}
     */
    async saveTransactions(transactions: any[]): Promise<void> {
        const transactionEntities = transactions.map(tx => this.transactionRepository.create(tx));
        await this.transactionRepository.save(transactionEntities);
    }

    /**
     * 데이터베이스에 마지막으로 확인된 블록 번호를 업데이트합니다.
     * @param {number} blockNumber 업데이트할 블록 번호
     * @returns {Promise<void>}
     */
    async updateLastCheckedBlockNumber(blockNumber: number): Promise<void> {
        const block = this.blockRepository.create({
            number: blockNumber,
            checkedAt: new Date()
        });
        await this.blockRepository.save(block);
    }

}
