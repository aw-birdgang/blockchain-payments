import {Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import {Client, ClientContainer} from "../../entities/client.entity";

@Injectable()
export class ClientService {
    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        @InjectRepository(ClientContainer)
        private clientContainerRepository: Repository<ClientContainer>,
    ) {}

    findById(id: number): Promise<Client> {
        return this.clientRepository.findOneBy({ id });
    }

}
