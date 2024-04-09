import { Injectable, Logger } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Web3 from 'web3';

// Entities
import {GroupFeeWallet, Group_Fee_Purse_History, Common_Code} from '../../entities';

/**
 * 이더리움 블록체인내에서 수수료 지갑 입금 트랙잭션 읽어서 등록하도록 한다. [Ether]
 */
@Injectable()
export class EthereumFeeDepositService {
  private readonly logger = new Logger(EthereumFeeDepositService.name);

  rpcurl = process.env.ETHEREUM_ENDPOINT;
  web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));

  // Ethreum Address List
  addressList: string[] = [];
  addressPKList = new Map();

  processing = false;
  processTimer;

  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(Common_Code)
    private CommonCodeRepository: Repository<Common_Code>,
    @InjectRepository(GroupFeeWallet)
    private GroupFeeWalletRepository: Repository<GroupFeeWallet>,
    @InjectRepository(Group_Fee_Purse_History)
    private GroupFeePurseHistoryRepository: Repository<Group_Fee_Purse_History>,
  ) {
    this.main();
  }

  async main() {
    // DB로부터 Address list 획득
    await this.getEthereumDBAddress();

    this.logger.log('DB Address Count : ' + this.addressList.length);
    const currentBlockNumber = await this.web3.eth.getBlockNumber();
    this.logger.log('Current network block number : ' + currentBlockNumber);

    // Test (특정 블럭 확인)
    // await this.checkSingleBlock(4934626);

    await this.checkBlock();
    this.processTimer = setInterval(async () => {
      await this.checkBlock();
    }, 12 * 1000);
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
    const currentBlockData = await this.CommonCodeRepository.find({ where: { code_index: 'ethereum_fee_current_block' } });
    if (currentBlockData.length >= 1) {
      return Number(currentBlockData[0].code_value);
    } else {
      return 0;
    }
  }

  // DB 현재 블럭 번호 저장
  async writeBlockNumber(block_number) {
    const saveBlockData = new Common_Code();
    saveBlockData.code_index = 'ethereum_fee_current_block';
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

      // ==========================
      // === Etherem Base Token ===
      // ==========================

      // 블럭 내 tx들 중 to주소에 회원 주소가 있는지 필터링
      const addresses = block.transactions.map((t) => t.to);
      //this.logger.debug('addresses.length : ' + addresses.length);
      const filteredAddresses = await this.getEthereumAddress(addresses);
      this.logger.log(`Number of interested vanity address [Ether]: ${filteredAddresses.length}`);

      // 필터링된 주소가 있는 트랜잭션만 분리
      const txs_filtered = [];
      block.transactions.forEach((tx) => {
        const toAddress = tx.to == null ? '' : tx.to.toLowerCase();
        filteredAddresses.forEach((fa) => {
          if (toAddress == fa.toLowerCase()) {
            txs_filtered.push(tx);
          }
        });
      });

      //const txs = block.transactions.filter((t) => filteredAddresses.indexOf(t.to) != -1);
      if (txs_filtered.length > 0) this.logger.log(txs_filtered);

      // 트랜잭션 읽기
      txs_filtered.forEach(async (tx) => {
        const receiptData = await this.web3.eth.getTransactionReceipt(tx.hash);
        if (receiptData.status && tx.from != process.env.HOT_WALLET_ADDRESS) {
          const gfph = await this.GroupFeePurseHistoryRepository.find({ where: { txhash: tx.hash } });
          if (gfph.length == 0) {
            const addressData = await this.GroupFeeWalletRepository.findOne({ where: { wallet_address: tx.to, network: 'Ethereum' } });
            await this.commonService.deposit_fee_purse(
              addressData.group_code,
              'Ethereum',
              'Ether',
              Number(this.web3.utils.fromWei(tx.value.toString(), 'ether')),
              tx.hash,
              'from:' + receiptData.from,
            );
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
    const addressListData = await this.GroupFeeWalletRepository.find();
    this.addressList = [];
    this.addressPKList = new Map();

    for (let i = 0; i < addressListData.length; i++) {
      this.addressList.push(addressListData[i].wallet_address);
      this.addressPKList.set(
        addressListData[i].wallet_address.toLowerCase(),
        this.commonService.decryptAES(addressListData[i].wallet_private_key),
      );
    }
  }

  // Address List 에서 필터링된 List 획득
  async getEthereumAddress(addresses: string[]) {
    //this.logger.debug('this.addressList.length : ' + this.addressList.length);
    const addressListData = this.addressList.filter((item) => addresses.includes(item.toLocaleLowerCase()));
    //this.logger.debug('addressListData.length : ' + addressListData.length);
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
