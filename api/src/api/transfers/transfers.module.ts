import {forwardRef, Module} from '@nestjs/common';
import {CommonModule} from "../../common/common.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EtherService} from "../ether/ether.service";
import {CommonService} from "../../common/common.service";
import {ConfigService} from "../../config";
import {Transfer} from "./entities/transfer.entity";
import {TransfersController} from "./transfers.controller";
import {TransfersService} from "./transfers.service";

@Module({
    imports: [
        forwardRef(() => CommonModule),
        TypeOrmModule.forFeature([
            Transfer,
        ]),
    ],
    controllers: [TransfersController],
    providers: [TransfersService, EtherService, CommonService, ConfigService,],
})
export class TransfersModule {}
