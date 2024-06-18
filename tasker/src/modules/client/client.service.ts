import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'entities/src/entities/client.entity';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  private readonly logger = new Logger(ClientService.name);

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
    const client = await this.clientRepository.findOne({
      where: { name: name },
    });
    if (isEmpty(client) === true) {
      throw new NotFoundException('NOT_FOUND_CLIENT');
    }
    return client;
  }
}
