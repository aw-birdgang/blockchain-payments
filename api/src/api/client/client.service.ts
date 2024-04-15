import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Client} from "../../entities";
import {ClientRequestCreateDto} from "../../dto/client-request-create.dto";
import {isEmpty} from "../../common/util/is-empty";

@Injectable()
export class ClientService {
    constructor(
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

    findById(id: string): Promise<Client> {
        return this.clientRepository.findOneBy({ id });
    }

    async updateWebhookUrl(
        id: string,
        webhookUrl: string,
    ): Promise<Client> {
        try {
            this.logger.debug("updateWebhookUrl > id : " + id + " , webhookUrl : " + webhookUrl);
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
