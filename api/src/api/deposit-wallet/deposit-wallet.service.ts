import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Pagination, PaginationOptions} from "../../pagiante";
import {isEmpty} from "../../common/util/is-empty";
import {ClientWalletRequestCreateDto} from "./dto/client-wallet-request-create.dto";
import {DepositWallet} from "./entities/deposit-wallet.entity";

@Injectable()
export class DepositWalletService {
    constructor(
        @InjectRepository(DepositWallet)
        private depositWalletRepository: Repository<DepositWallet>,
    ) {}

    private readonly logger = new Logger(DepositWalletService.name);

    async createDepositWallet(requestDto: ClientWalletRequestCreateDto): Promise<DepositWallet> {
        const insertEntry = DepositWallet.of(requestDto);
        const builder = await this.depositWalletRepository.createQueryBuilder()
            .insert()
            .into(DepositWallet)
            .values(insertEntry)
            .execute();
        this.logger.log("createDepositWallet > insertEntry.id : " + insertEntry.id);
        return insertEntry;
    }

    async findAll(): Promise<DepositWallet[]> {
        return await this.depositWalletRepository.find();
    }

    async findClients(options: PaginationOptions,): Promise<Pagination<DepositWallet>> {
        const { take, page } = options;
        const builder = this.depositWalletRepository.createQueryBuilder("client_wallet");
        const total = await builder.getCount()
        const results = await builder.orderBy('created_at', 'DESC')
            .skip(take * (page - 1))
            .take(take)
            .getMany();
        return new Pagination<DepositWallet>({
            results,
            total,
        });
    }

    async findById(id: string): Promise<DepositWallet> {
        return await this.findDepositWalletById(id);
    }

    async isExistDepositWallet(id: string): Promise<boolean> {
        const depositWallet = await this.depositWalletRepository.findOne({
            where: { id: id },
        });
        return isEmpty(depositWallet) === false;
    }

    async findDepositWalletById(id: string): Promise<DepositWallet> {
        return await this.depositWalletRepository.findOne({
            where: {id: id},
        });
    }


    async findDepositWalletByAddress(address: string): Promise<DepositWallet> {
        return await this.depositWalletRepository.findOne({
            where: {address: address},
        });
    }

    async isClientDepositAddress(clientId: string, address: string,): Promise<DepositWallet> {
        return await this.depositWalletRepository.findOne({
            where: {
                clientId: clientId,
                address: address
            },
        });
    }

    async isDepositAddress(address: string,): Promise<DepositWallet> {
        return await this.depositWalletRepository.findOne({
            where: {
                address: address
            },
        });
    }

    async deleteClientById(id: string): Promise<void> {
        await this.depositWalletRepository.delete(id);
    }

    async deleteClientWallet(id: string): Promise<DepositWallet> {
        const clientWallet = await this.findById(id);
        const result = await this.depositWalletRepository.delete(id);
        this.logger.log('result :: ' + result);
        return clientWallet;
    }

}
