import {Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {EntityManager, Repository} from 'typeorm';

// Entities
import {GroupContainer, Wallet,} from '../../entities';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(GroupContainer)
    private ApiKeyRepository: Repository<GroupContainer>,
    @InjectRepository(Wallet)
    private WalletRepository: Repository<Wallet>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    // private readonly etherService: EtherService,
  ) {}




}
