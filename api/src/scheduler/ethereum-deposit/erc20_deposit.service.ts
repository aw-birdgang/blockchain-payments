import { Injectable, Logger } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { readFileSync } from 'fs';
import * as crypto from 'crypto';
import Web3 from 'web3';

// Entities
import { Coin_Address, Common_Code, Ethereum_Deposit_Transactions } from '../../entities';

/**
 * 이더리움 블록체인내에서 ERC20 토큰 입금 트랙잭션 읽어서 등록하도록 한다.
 */
@Injectable()
export class ERC20DepositService {
  private readonly logger = new Logger(ERC20DepositService.name);

  rpcurl = process.env.ETHEREUM_ENDPOINT;
  web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));

  erc20abiFile = './abi/erc20.json';
  contract_abi = JSON.parse(readFileSync(this.erc20abiFile).toString());

  ERC20_Token_Map = new Map();
  ERC20_Token_Decimal = new Map();

  // Ethreum Address List
  addressList: string[] = [];
  addressPKList = new Map();

  processing = false;
  processTimer;

  tokenList;

  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(Common_Code)
    private CommonCodeRepository: Repository<Common_Code>,
    @InjectRepository(Coin_Address)
    private CoinAddressRepository: Repository<Coin_Address>,
    @InjectRepository(Ethereum_Deposit_Transactions)
    private EthereumDepositTransactionsRepository: Repository<Ethereum_Deposit_Transactions>,
  ) {
    this.tokenList = commonService.getEthereumTokens();

    for (const item of this.tokenList) {
      this.ERC20_Token_Map.set(item.contractAddress, item.symbol);
      this.ERC20_Token_Decimal.set(item.symbol, item.decimals);
    }

    //this.main();
  }

  async main() {
    // DB로부터 Address list 획득
    await this.getEthereumDBAddress();

    this.logger.log('DB Address Count : ' + this.addressList.length);
    const currentBlockNumber = await this.web3.eth.getBlockNumber();
    this.logger.log('Current network block number : ' + currentBlockNumber);

    // =====================================
    // Test (특정 블럭 확인)
    // await this.checkSingleBlock(4819588);
    // =====================================

    // await this.checkBlock();
    // this.processTimer = setInterval(async () => {
    //   await this.checkBlock();
    // }, 12 * 1000);
  }

  // 블록 확인
  async checkBlock() {
    if (this.processing) {
      return;
    }
    this.processing = true;

    try {
      // DB로부터 Address list 획득
      await this.getEthereumDBAddress();
      this.logger.log('DB Registered Address Count : ' + this.addressList.length);

      // DB로 부터 현재 블럭 확인
      let blockNumber = await this.readBlockNumber();
      // Blockchain에서 현재 블록확인 (컨펌 확인)
      const cbn = Number(await this.web3.eth.getBlockNumber());

      // DB 블럭넘버 오류 수정
      if (blockNumber > cbn) {
        blockNumber = cbn;
        await this.writeBlockNumber(blockNumber);
      }
      this.logger.debug('DB blockNumber : ' + blockNumber + ', network blockNumber : ' + cbn);
      const currentBlockNumber = cbn - Number(process.env.ETHEREUM_CONFIRM_COUNT);

      if (blockNumber == 0) {
        this.logger.log(`First time running at block ${currentBlockNumber.toString()}`);
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
    const currentBlockData = await this.CommonCodeRepository.find({ where: { code_index: 'erc20_current_block' } });
    if (currentBlockData.length >= 1) {
      return Number(currentBlockData[0].code_value);
    } else {
      return 0;
    }
  }

  // DB 현재 블럭 번호 저장
  async writeBlockNumber(block_number) {
    const saveBlockData = new Common_Code();
    saveBlockData.code_index = 'erc20_current_block';
    saveBlockData.code_value = block_number;

    return await this.CommonCodeRepository.save(saveBlockData);
  }

  // 블럭 내 Transaction 확인
  async checkSingleBlock(blockNumber) {
    try {
      this.logger.log(`Checking block number : ${blockNumber.toString()}`);
      // 블럭정보 가져오기
      const block = await this.web3.eth.getBlock(blockNumber, true);
      if (block == null || block.transactions == undefined) {
        // DB 현재 블럭 번호 저장
        await this.writeBlockNumber(blockNumber);
        return;
      }
      this.logger.log(`Found block ${blockNumber.toString()} with ${block.transactions.length} transactions`);

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
            toAmount = this.web3.utils.fromWei(Number('0x' + amountStr).toString(), 'mwei');
          } else if (this.ERC20_Token_Decimal.get(erc20_txs[i].Token) == 18) {
            toAmount = this.web3.utils.fromWei(Number('0x' + amountStr).toString(), 'ether');
          } else {
            toAmount = this.web3.utils.fromWei(Number('0x' + amountStr).toString(), 'ether');
          }
        }
        // console.log(i + ' : ' + inputOrder);
        // console.log(i + ' : ' + toAddress);
        // console.log(i + ' : ' + toAmount);

        erc20_txs[i].toAddress = toAddress;
        erc20_txs[i].toAmount = toAmount;
        erc20_txs[i].decimal = this.ERC20_Token_Decimal.get(erc20_txs[i].Token);
      }

      const filteredAddresses = await this.getEthereumAddress(erc20_txs);
      this.logger.log(`Number of interested vanity address: ${filteredAddresses.length}`);

      // 필터링된 주소가 있는 트랜잭션만 분리
      //const txs_filtered = erc20_txs.filter((t) => filteredAddresses.indexOf(t.toAddress) != -1);
      const txs_filtered = [];
      erc20_txs.forEach((tx) => {
        const toAddress = tx.toAddress == null ? '' : tx.toAddress.toLowerCase();
        filteredAddresses.forEach((fa) => {
          if (toAddress == fa.toLowerCase()) {
            txs_filtered.push(tx);
          }
        });
      });

      if (txs_filtered.length > 0) this.logger.log(txs_filtered);

      // 트랜잭션 읽기
      txs_filtered.forEach(async (tx) => {
        const receiptData = await this.web3.eth.getTransactionReceipt(tx.hash);

        if (receiptData.status) {
          const edt = await this.EthereumDepositTransactionsRepository.find({ where: { txhash: tx.hash } });

          if (edt.length == 0) {
            const addressData = await this.CoinAddressRepository.findOne({ where: { address: tx.toAddress, network: 'Ethereum' } });

            const ethereum_Deposit_Transactions = new Ethereum_Deposit_Transactions();
            ethereum_Deposit_Transactions.group_code = addressData != null ? addressData.group_code : '';
            ethereum_Deposit_Transactions.txhash = tx.hash;
            ethereum_Deposit_Transactions.block_number = Number(tx.blockNumber);
            ethereum_Deposit_Transactions.from_address = tx.from;
            ethereum_Deposit_Transactions.to_address = tx.toAddress;
            ethereum_Deposit_Transactions.coin = tx.Token;
            ethereum_Deposit_Transactions.amounts = tx.toAmount;
            ethereum_Deposit_Transactions.blkhash = '0x' + crypto.randomBytes(24).toString('hex');

            await this.EthereumDepositTransactionsRepository.save(ethereum_Deposit_Transactions);
          }
        }
      });

      // DB 현재 블럭 번호 저장
      await this.writeBlockNumber(blockNumber);
    } catch (e) {
      console.error(e);
      clearInterval(this.processTimer);
    }
  }

  // DB로부터 Address list 획득
  async getEthereumDBAddress() {
    const addressListData = await this.CoinAddressRepository.find({ where: { group_code: Not(IsNull() || '') } });
    this.addressList = [];
    this.addressPKList = new Map();

    for (let i = 0; i < addressListData.length; i++) {
      this.addressList.push(addressListData[i].address);
      this.addressPKList.set(addressListData[i].address.toLowerCase(), this.commonService.decryptAES(addressListData[i].private_key));
    }
  }

  // Address List 에서 필터링된 List 획득
  async getEthereumAddress(addresses) {
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
