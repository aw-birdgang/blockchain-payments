import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ConfigService} from "../../config";
import {CommonService} from "../../common/common.service";
import {InjectRepository} from "@nestjs/typeorm";
import {CoinAddress, Common_Code, EthereumDepositTransactions} from "../../entities";
import {Repository} from "typeorm";
import Web3 from "web3";
import {readFileSync} from "fs";

@Injectable()
export class EthereumService implements OnModuleInit {

    private readonly logger = new Logger(EthereumService.name);

    //
    private readonly rpcurl: string;
    private web3: any;

    private erc20abiFile: string;
    private readonly contract_abi: string;

    private ERC20_Token_Map = new Map();
    private ERC20_Token_Decimal = new Map();

// Ethreum Address List
    addressList: string[] = [];
    addressPKList = new Map();

    private processing: boolean = false;

    private readonly USDT_ADDRESS = '0x16d1e20a0d1435b653934d34abdf9d0e6f9f7cf5';


    constructor(
        private readonly configService: ConfigService,
        private readonly commonService: CommonService,
        @InjectRepository(Common_Code)
        private CommonCodeRepository: Repository<Common_Code>,
        @InjectRepository(CoinAddress)
        private CoinAddressRepository: Repository<CoinAddress>,
        @InjectRepository(EthereumDepositTransactions)
        private EthereumDepositTransactionsRepository: Repository<EthereumDepositTransactions>,
    ) {
        this.rpcurl = this.configService.get("ETHEREUM_ENDPOINT");
        this.logger.log("EthereumDepositService > rpcurl : " + this.rpcurl);

        this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));
        this.erc20abiFile = './abi/erc20.json';
        this.contract_abi = JSON.parse(readFileSync(this.erc20abiFile).toString());
        this.logger.log("contract_abi : " + this.contract_abi);

        this.ERC20_Token_Map.set(this.USDT_ADDRESS, "USDT");
        this.ERC20_Token_Decimal.set("USDT", 6);
    }



    async onModuleInit() {
        this.logger.log('onModuleInit()');
        const result = await this.init ();
    }

    async init () {
        // 여기에 초기화 로직을 추가합니다.
        // await this.getEthereumDBAddress();
        // this.logger.log('DB Address Count : ' + this.addressList.length);
        // const currentBlockNumber = await this.web3.eth.getBlockNumber();
        // this.logger.log('Current network block number : ' + currentBlockNumber);
    }

}
