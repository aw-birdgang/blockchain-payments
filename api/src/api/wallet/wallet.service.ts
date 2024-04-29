import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {Wallet,} from '../../entities';
import {EtherService} from "../ether/ether.service";
import {CommonService} from "../../common/common.service";
import {Pagination, PaginationOptions} from "../../pagiante";
import {ClientService} from "../client/client.service";
import {isEmpty} from "../../common/util/is-empty";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private readonly etherService: EtherService,
    private readonly commonService: CommonService,
    private readonly clientService: ClientService,
  ) {}

  private readonly logger = new Logger(WalletService.name);

  async findAll(): Promise<Wallet[]> {
    this.logger.debug('WalletService > findAll');
    return this.walletRepository.find();
  }

  async findWallets(options: PaginationOptions,): Promise<Pagination<Wallet>> {
    const { take, page } = options;
    const builder = this.walletRepository.createQueryBuilder("wallet");
    const total = await builder.getCount()
    const results = await builder.orderBy('created_at', 'DESC')
        .skip(take * (page - 1))
        .take(take)
        .getMany();
    return new Pagination<Wallet>({
      results,
      total,
    });
  }


  async findById(id: string): Promise<Wallet> {
    return this.walletRepository.findOneBy({ id });
  }


  async findAllByClientId(clientId: string): Promise<Wallet[]> {
    const builder = this.walletRepository.createQueryBuilder("wallet")
    const results = await builder
        .where("wallet.client_id = :client_id", { client_id: clientId })
        .orderBy('created_at', 'DESC')
        .getMany();
    return results;
  }

  async createWallet(clientId: string, network: string = 'Ethereum') {
    if (network != 'Ethereum') network = 'Ethereum';

    const client = await this.clientService.findById(clientId);
    if (isEmpty(client) === true) {
      throw new NotFoundException("not exist client");
    }

    const account = await this.etherService.createAccount();
    const wallet = new Wallet();
    wallet.network = network;
    wallet.address = account.address;
    wallet.private_key = this.commonService.encryptAES(account.privateKey);

    return await this.walletRepository.save(wallet);
  }

}
