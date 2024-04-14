import {forwardRef, Module} from '@nestjs/common';
import {CommonModule} from "../../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientContainer} from "../../entities";
import {ClientContainerService} from "./client-container.service";
import {ClientContainerController} from "./client-container.controller";

@Module({
    imports: [
        forwardRef(() => CommonModule),
        TypeOrmModule.forFeature([
            ClientContainer,
        ]),
    ],
    providers: [ClientContainerService,],
    controllers: [ClientContainerController,],
    exports: [ClientContainerService,],
})
export class ClientContainerModule {}
