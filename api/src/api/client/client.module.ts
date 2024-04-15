import {forwardRef, Module} from '@nestjs/common';
import {ClientService} from "./client.service";
import {ClientController} from "./client.controller";
import {CommonModule} from "../../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Client} from "../../entities";

@Module({
    imports: [
        forwardRef(() => CommonModule),
        TypeOrmModule.forFeature([
            Client,
        ]),
    ],
    providers: [ClientService,],
    controllers: [ClientController,],
    exports: [ClientService,],
})
export class ClientModule {}
