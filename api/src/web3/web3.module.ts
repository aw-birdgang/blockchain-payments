import {Module} from '@nestjs/common';
import {ConfigService} from "../config";
import {Web3Service} from "./web3.service";
import {CommonService} from "../common/common.service";

@Module({
    imports: [
    ],
    providers: [ConfigService, CommonService],
    exports: [Web3Service],
})
export class Web3Module {}
