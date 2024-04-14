import {Injectable, Logger} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import {ClientContainer} from "../../entities";
import {ClientContainerRequestCreateDto} from "../../dto/client-container-request-create.dto";

@Injectable()
export class ClientContainerService {
    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
        @InjectRepository(ClientContainer)
        private clientContainerRepository: Repository<ClientContainer>,
    ) {}

    private readonly logger = new Logger(ClientContainerService.name);

    async create(requestDto: ClientContainerRequestCreateDto): Promise<ClientContainer> {
        const client = this.clientContainerRepository.create(ClientContainer.of(requestDto));
        return this.clientContainerRepository.save(client);
    }

    async findAll(): Promise<ClientContainer[]> {
        const results = await this.clientContainerRepository.find();
        return results;
    }

    findByClientCode(client_code: string): Promise<ClientContainer> {
        return this.clientContainerRepository.findOneBy({ client_code });
    }

    async deleteClientContainer(client_code: string): Promise<ClientContainer> {
        const clientContainer = await this.findByClientCode(client_code);
        const result = await this.clientContainerRepository.delete(client_code);
        this.logger.log('result :: ' + result);
        return clientContainer;
    }
}
