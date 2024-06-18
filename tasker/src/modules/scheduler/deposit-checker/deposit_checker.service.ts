import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '@nestjs/schedule';
import { EthereumDepositTransactions, Wallet } from 'entities/src/entities';
import { ConfigService } from '../../config';

import { IsNull, Not, Repository } from 'typeorm';
import { readFileSync } from 'fs';
import * as crypto from 'crypto';
import Web3 from 'web3';

/**
 * 입금 내역 확인 서비스
 * : 블록 체인 입금 내역을 읽어서 자산 입금 처리
 * : 수수료 지갑 에서 수수료 차감 후
 * : 마스터 지갑에 자산 추가
 */
@Injectable()
export class DepositCheckerService {
  private readonly logger = new Logger(DepositCheckerService.name);

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
    @InjectRepository(Wallet)
    private CoinAddressRepository: Repository<Wallet>,
    @InjectRepository(EthereumDepositTransactions)
    private EthereumDepositTransactionsRepository: Repository<EthereumDepositTransactions>,
  ) {
    this.rpcurl = this.configService.get('ETHEREUM_ENDPOINT');
    this.logger.log('EthereumDepositService > rpcurl : ' + this.rpcurl);

    this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));
    this.erc20abiFile = './abi/erc20.json';
    this.contract_abi = JSON.parse(readFileSync(this.erc20abiFile).toString());
    this.logger.log('contract_abi : ' + this.contract_abi);

    this.ERC20_Token_Map.set(this.USDT_ADDRESS, 'USDT');
    this.ERC20_Token_Decimal.set('USDT', 6);
  }

  async onModuleInit() {
    this.logger.log('onModuleInit()');
    const result = await this.init();
  }

  async init() {
    // 여기에 초기화 로직을 추가합니다.
    await this.getEthereumDBAddress();
    this.logger.log('DB Address Count : ' + this.addressList.length);
    const currentBlockNumber = await this.web3.eth.getBlockNumber();
    this.logger.log('Current network block number : ' + currentBlockNumber);
  }

  // 블록 확인
  @Interval(10000)
  async checkBlock() {
    if (this.processing) {
      return;
    }
    this.processing = true;

    try {
      // DB로부터 Address list 획득
      await this.getEthereumDBAddress();
      this.logger.log(
        'DB Registered Address Count : ' + this.addressList.length,
      );

      // DB로 부터 현재 블럭 확인
      let blockNumber = await this.readBlockNumber();
      // Blockchain에서 현재 블록확인 (컨펌 확인)
      const cbn = Number(await this.web3.eth.getBlockNumber());

      // DB 블럭넘버 오류 수정
      if (blockNumber > cbn) {
        blockNumber = cbn;
        await this.writeBlockNumber(blockNumber);
      }
      this.logger.debug(
        'DB blockNumber : ' + blockNumber + ', network blockNumber : ' + cbn,
      );
      const confirmCount = this.configService.get('ETHEREUM_CONFIRM_COUNT');
      this.logger.debug('confirmCount : ' + confirmCount);
      const currentBlockNumber = cbn - Number(confirmCount);

      if (blockNumber == 0) {
        this.logger.log(
          `First time running at block ${currentBlockNumber.toString()}`,
        );
        await this.checkSingleBlock(currentBlockNumber);
        return;
      }

      while (blockNumber < currentBlockNumber) {
        blockNumber++;
        await this.checkSingleBlock(blockNumber);
      }
    } finally {
      this.processing = false;
    }
  }

  // DB로 부터 현재 블럭 번호 확인
  async readBlockNumber() {
    // const currentBlockData = await this.CommonCodeRepository.find({
    //   where: { code_index: 'ethereum_current_block' },
    // });
    // if (currentBlockData.length >= 1) {
    //   return Number(currentBlockData[0].code_value);
    // } else {
    //   return 0;
    // }
    return 0;
  }

  // DB 현재 블럭 번호 저장
  async writeBlockNumber(block_number) {}

  async findBlockByNumber(blockNumber: number) {
    const block = await this.web3.eth.getBlock(blockNumber, true);
    if (!block || !block.transactions) {
      await this.writeBlockNumber(blockNumber);
      return [];
    }

    return block;
  }

  /**
   * 블록에서 특정 주소로 보내려고 하는 트랜 잭션의 목록 가져 오기.
   * @param blockNumber
   * @param toAddress
   */
  async filterTransactionsByToAddress(
    blockNumber: number,
    toAddress: string,
  ): Promise<any[]> {
    const block = await this.findBlockByNumber(blockNumber);
    const transactions = block.transactions.filter((tx) => tx.to === toAddress);
    return transactions;
  }

  /**
   * 블록에서 특정 주소들로 보내려고 하는 트랜 잭션의 목록 가져 오기.
   * @param blockNumber
   * @param toAddress
   */
  async getTransactionsByAddresses(
    transactions: any,
    addresses: string[],
  ): Promise<any[]> {
    // 주어진 주소 배열에 포함된 `toAddress`를 가진 트랜잭션만 필터링
    const txs_filtered = transactions.filter((tx) => {
      // tx.to 주소가 존재하는지 확인하고 로깅합니다.
      if (tx.to) {
        //this.logger.debug(`Transaction to: ${tx.to}`); // tx.to 주소 로깅
        return addresses.includes(tx.to.toLowerCase());
      } else {
        //this.logger.debug('Transaction to: null'); // tx.to가 null인 경우 로깅
        return false; // tx.to가 null이면 필터링에서 제외합니다.
      }
    });
    return txs_filtered;
  }

  // 블럭 내 Transaction 확인
  async checkSingleBlock(blockNumber) {
    try {
      this.logger.log(`Checking block number : ${blockNumber.toString()}`);
      // 블럭정보 가져오기
      const block = await this.findBlockByNumber(blockNumber);
      this.logger.log(
        `Found block ${blockNumber.toString()} with ${block.transactions.length} transactions`,
      );

      // ==========================
      // === Etherem Base Token ===
      // ==========================

      // 블럭 내 tx들 중 to주소에 회원 주소가 있는지 필터링
      const txs_filtered = await this.getTransactionsByAddresses(
        block.transactions,
        this.addressList,
      );
      // const txs_filtered = block.transactions.filter(tx => {
      //   // tx.to 주소가 존재하는지 확인하고 로깅합니다.
      //   if (tx.to) {
      //     this.logger.debug(`Transaction to: ${tx.to}`); // tx.to 주소 로깅
      //     return this.addressList.includes(tx.to.toLowerCase());
      //   } else {
      //     this.logger.debug('Transaction to: null'); // tx.to가 null인 경우 로깅
      //     return false; // tx.to가 null이면 필터링에서 제외합니다.
      //   }
      // });

      this.logger.log(
        `Number of interested vanity address [Ether]: ${txs_filtered.length}`,
      );

      //const txs = block.transactions.filter((t) => filteredAddresses.indexOf(t.to) != -1);
      if (txs_filtered.length > 0) this.logger.log(txs_filtered);

      // 트랜잭션 읽기
      for (const tx of txs_filtered) {
        const receiptData = await this.web3.eth.getTransactionReceipt(tx.hash);
        const hotWalletAddress = this.configService.get('HOT_WALLET_ADDRESS');
        if (receiptData.status && tx.from != hotWalletAddress) {
          const edt = await this.EthereumDepositTransactionsRepository.find({
            where: { txhash: tx.hash },
          });
          if (edt.length == 0) {
            const addressData = await this.CoinAddressRepository.findOne({
              where: { address: tx.to, network: 'Ethereum' },
            });

            const ethereumDepositTransactions =
              new EthereumDepositTransactions();
            ethereumDepositTransactions.clientId =
              addressData != null ? addressData.id : '';
            ethereumDepositTransactions.txHash = tx.hash;
            ethereumDepositTransactions.blockNumber = Number(tx.blockNumber);
            ethereumDepositTransactions.fromAddress = tx.from;
            ethereumDepositTransactions.toAddress = tx.to;
            ethereumDepositTransactions.coin = 'Ether';
            ethereumDepositTransactions.amounts = Number(
              weiToEth(tx.value.toString()),
            );
            ethereumDepositTransactions.blkHash =
              '0x' + crypto.randomBytes(24).toString('hex');

            await this.EthereumDepositTransactionsRepository.save(
              ethereumDepositTransactions,
            );
          }
        }
      }

      // ===========================
      // === Etherem ERC20 Token ===
      // ===========================

      // 블럭 내 tx들 중 해당 토큰관련 tx 추출
      //const erc20_txs = block.transactions.filter((t) => this.ERC20_Token_Map.has(t.to));
      const erc20_txs = [];
      block.transactions.forEach((tx) => {
        const toAddress = tx.to == null ? '' : tx.to.toLowerCase();
        if (this.ERC20_Token_Map.has(toAddress)) {
          erc20_txs.push(tx);
        }
      });

      // ERC20 ToAddress 및 전송량 판별
      for (let i = 0; i < erc20_txs.length; i++) {
        erc20_txs[i].Token = this.ERC20_Token_Map.get(erc20_txs[i].to);

        const inputOrder = erc20_txs[i].input.substr(0, 10);
        let toAddress = '0x00000000';
        let toAmount = '0x00000000';

        if (inputOrder == '0xa9059cbb') {
          toAddress = '0x' + erc20_txs[i].input.substr(34, 40);
          const amountStr = erc20_txs[i].input.substr(74, 64);
          // Token별 decimal 에 따라 자산 단위 변경
          if (this.ERC20_Token_Decimal.get(erc20_txs[i].Token) == 6) {
            toAmount = this.web3.utils.fromWei(
              Number('0x' + amountStr).toString(),
              'mwei',
            );
          } else if (this.ERC20_Token_Decimal.get(erc20_txs[i].Token) == 18) {
            toAmount = this.web3.utils.fromWei(
              Number('0x' + amountStr).toString(),
              'ether',
            );
          } else {
            toAmount = this.web3.utils.fromWei(
              Number('0x' + amountStr).toString(),
              'ether',
            );
          }
        }
        // console.log(i + ' : ' + inputOrder);
        // console.log(i + ' : ' + toAddress);
        // console.log(i + ' : ' + toAmount);

        erc20_txs[i].toAddress = toAddress;
        erc20_txs[i].toAmount = toAmount;
        erc20_txs[i].decimal = this.ERC20_Token_Decimal.get(erc20_txs[i].Token);
      }

      const filteredAddressesERC20 =
        await this.getEthereumAddressERC20(erc20_txs);
      this.logger.log(
        `Number of interested vanity address [ERC20]: ${filteredAddressesERC20.length}`,
      );

      // 필터링된 주소가 있는 트랜잭션만 분리
      //const txs_filteredERC20 = erc20_txs.filter((t) => filteredAddressesERC20.indexOf(t.toAddress) != -1);
      const txs_filteredERC20 = [];
      erc20_txs.forEach((tx) => {
        const toAddress =
          tx.toAddress == null ? '' : tx.toAddress.toLowerCase();
        filteredAddressesERC20.forEach((fa) => {
          if (toAddress == fa.toLowerCase()) {
            txs_filteredERC20.push(tx);
          }
        });
      });

      if (txs_filteredERC20.length > 0) this.logger.log(txs_filteredERC20);

      // 트랜잭션 읽기
      for (const tx of txs_filteredERC20) {
        const receiptData = await this.web3.eth.getTransactionReceipt(tx.hash);

        if (receiptData.status) {
          const edt = await this.EthereumDepositTransactionsRepository.find({
            where: { txhash: tx.hash },
          });

          if (edt.length == 0) {
            const addressData = await this.CoinAddressRepository.findOne({
              where: { address: tx.toAddress, network: 'Ethereum' },
            });

            const ethereumDepositTransactions =
              new EthereumDepositTransactions();
            ethereumDepositTransactions.clientId =
              addressData != null ? addressData.id : '';
            ethereumDepositTransactions.txHash = tx.hash;
            ethereumDepositTransactions.blockNumber = Number(tx.blockNumber);
            ethereumDepositTransactions.fromAddress = tx.from;
            ethereumDepositTransactions.toAddress = tx.toAddress;
            ethereumDepositTransactions.coin = tx.Token;
            ethereumDepositTransactions.amounts = tx.toAmount;
            ethereumDepositTransactions.blkHash =
              '0x' + crypto.randomBytes(24).toString('hex');

            await this.EthereumDepositTransactionsRepository.save(
              ethereumDepositTransactions,
            );
          }
        }
      }

      // DB 현재 블럭 번호 저장
      await this.writeBlockNumber(blockNumber);
    } catch (e) {
      console.error(e);
    }
  }

  // DB로부터 Address list 획득
  async getEthereumDBAddress() {
    const addressListData = await this.CoinAddressRepository.find({
      where: { clientId: Not(IsNull() || '') },
    });
    this.addressList = [];
    this.addressPKList = new Map();

    for (let i = 0; i < addressListData.length; i++) {
      this.addressList.push(addressListData[i].address);
      this.addressPKList.set(
        addressListData[i].address.toLowerCase(),
        this.commonService.decryptAES(addressListData[i].private_key),
      );
    }
  }

  // Address List 에서 필터링된 List 획득
  async getEthereumAddress(addresses: string[]) {
    //this.logger.debug('this.addressList.length : ' + this.addressList.length);
    const addressListData = this.addressList.filter((item) =>
      addresses.includes(item.toLocaleLowerCase()),
    );
    //this.logger.debug('addressListData.length : ' + addressListData.length);
    return addressListData;
  }

  // Address List 에서 필터링된 List 획득
  async getEthereumAddressERC20(addresses) {
    const addressListData = [];

    try {
      this.addressList.forEach((item1) => {
        addresses.forEach((item2) => {
          if (item1.toLowerCase() == item2.toAddress.toLowerCase()) {
            addressListData.push(item2.toAddress);
          }
        });
      });
    } catch (e) {
      console.log(e);
      return null;
    }
    return addressListData;
  }

  // addressPKList 에서 PK 획득
  async privateKeyProvider(address) {
    return this.addressPKList.get(address.toLowerCase());
  }

  // sleep 함수
  sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
}
