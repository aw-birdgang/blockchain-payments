import {Injectable, Logger} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import {Client} from "../../entities";
import {ClientRequestCreateDto} from "../../dto/client-request-create.dto";

@Injectable()
export class ClientService {
    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
    ) {}

    private readonly logger = new Logger(ClientService.name);

    async createClient(requestDto: ClientRequestCreateDto): Promise<Client> {
        const client = this.clientRepository.create(Client.of(requestDto));
        return this.clientRepository.save(client);
    }

    async findAll(): Promise<Client[]> {
        const results = await this.clientRepository.find();
        return results;
    }

    findById(id: number): Promise<Client> {
        return this.clientRepository.findOneBy({ id });
    }

    async deleteClient(id: number): Promise<Client> {
        const client = await this.findById(id);
        const result = await this.clientRepository.delete(id);
        this.logger.log('result :: ' + result);
        return client;
    }

}
