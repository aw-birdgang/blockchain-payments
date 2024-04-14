import {Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {EntityManager, Repository} from 'typeorm';

// Entities
import {ClientContainer, Wallet,} from '../../entities';
import {EtherService} from "../ether/ether.service";
import {CommonService} from "../../common/common.service";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(ClientContainer)
    private clientContainerRepository: Repository<ClientContainer>,
    @InjectRepository(Wallet)
    private WalletRepository: Repository<Wallet>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly etherService: EtherService,
    private readonly commonService: CommonService,
  ) {}


  // Master Wallet 생성
  async createMasterWallet(client_code: string, network: string = 'Ethereum') {
    if (network != 'Ethereum') network = 'Ethereum';

    const masterWallet = await this.entityManager
        .createQueryBuilder(Wallet, 'mem')
        .select('client_code')
        .addSelect('address')
        .addSelect('created_at')
        .addSelect('updated_at')
        .where('mem.client_code = :client_code', { client_code: client_code })
        .andWhere('mem.network = :network', { network: network })
        .getRawMany();
    if (masterWallet.length > 0) return masterWallet;

    const account = await this.etherService.createAccount();

    const wallet = new Wallet();
    wallet.client_code = client_code;
    wallet.network = network;
    wallet.address = account.address;
    wallet.private_key = this.commonService.encryptAES(account.privateKey);

    return await this.WalletRepository.save(wallet);
  }

}
