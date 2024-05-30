import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './entities/transfer.entity';
import { Pagination, PaginationOptions } from '../../common/pagiante';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
  ) {}

  private readonly logger = new Logger(TransfersService.name);

  async findAll(): Promise<Transfer[]> {
    return this.transferRepository.find();
  }

  async findTransfers(options: PaginationOptions): Promise<Pagination<Transfer>> {
    const { take, page } = options;
    const builder = this.transferRepository.createQueryBuilder('transfers');
    const total = await builder.getCount();
    const results = await builder
      .orderBy('created_at', 'DESC')
      .skip(take * (page - 1))
      .take(take)
      .getMany();
    return new Pagination<Transfer>({
      results,
      total,
    });
  }

  async findById(id: number): Promise<Transfer> {
    return this.transferRepository.findOneBy({ id });
  }
}
