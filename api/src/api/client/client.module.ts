import {forwardRef, Module} from '@nestjs/common';
import {ClientService} from "./client.service";
import {ClientController} from "./client.controller";
import {CommonModule} from "../../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Client, ClientContainer} from "../../entities/client.entity";

@Module({
    imports: [
        forwardRef(() => CommonModule),
        TypeOrmModule.forFeature([
            Client,
            ClientContainer,
        ]),
    ],

    providers: [ClientService,],
    controllers: [ClientController,],
    exports: [ClientService,],
})
export class ClientModule {}
