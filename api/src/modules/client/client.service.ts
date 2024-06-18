import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientRequestCreateDto } from './dto/client-request-create.dto';
import { isEmpty } from '../../common/util/is-empty';
import { Pagination, PaginationOptions } from '../../common/pagiante';
import { Client } from 'entities/src/entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  private readonly logger = new Logger(ClientService.name);

  async createClient(requestDto: ClientRequestCreateDto): Promise<Client> {
    const insertEntry = Client.of(requestDto);
    const builder = await this.clientRepository
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values(insertEntry)
      .execute();
    this.logger.log('createClient > insertEntry.id : ' + insertEntry.id);
    return insertEntry;
  }

  async findAll(): Promise<Client[]> {
    const results = await this.clientRepository.find();
    return results;
  }

  async findClients(options: PaginationOptions): Promise<Pagination<Client>> {
    const { take, page } = options;
    const builder = this.clientRepository.createQueryBuilder('account');
    const total = await builder.getCount();
    const results = await builder
      .orderBy('created_at', 'DESC')
      .skip(take * (page - 1))
      .take(take)
      .getMany();
    return new Pagination<Client>({
      results,
      total,
    });
  }

  async findById(id: string): Promise<Client> {
    return await this.findClientById(id);
  }

  async isExistClient(id: string): Promise<boolean> {
    const client = await this.clientRepository.findOne({
      where: { id: id },
    });
    return isEmpty(client) === false;
  }

  async findClientById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id: id },
    });
    return client;
  }

  private async findClientByName(name: string): Promise<Client> {
    this.logger.log('findClientByName > name : ' + name);
    const client = await this.clientRepository.findOne({
      where: { name: name },
    });
    if (isEmpty(client) === true) {
      throw new NotFoundException('NOT_FOUND_CLIENT');
    }
    return client;
  }

  async deleteClientById(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async updateWebhookUrl(id: string, webhookUrl: string): Promise<Client> {
    try {
      this.logger.debug('updateWebhookUrl > id : ' + id + ' , webhookUrl : ' + webhookUrl);
      if (isEmpty(webhookUrl) === true) {
        return;
      }

      const client = await this.findById(id);
      if (isEmpty(webhookUrl) === true) {
        return;
      }
      client.webhookUrl = webhookUrl;
      return this.clientRepository.save(client);
    } catch (error: any) {
      this.logger.error(error);
    }
  }

  async deleteClient(id: string): Promise<Client> {
    const client = await this.findById(id);
    const result = await this.clientRepository.delete(id);
    this.logger.log('result :: ' + result);
    return client;
  }
}
