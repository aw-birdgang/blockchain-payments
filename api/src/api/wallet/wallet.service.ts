import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Repository } from 'typeorm';
import { EtherService } from '../ether/ether.service';
import { v1 as uuid } from 'uuid';

// Entities
import {
  Group_Apikey,
  Group_Master_Wallet,
  Coin_Address,
  Coin_Address_Register,
  Group_Master_Purse,
  Group_Fee_Purse,
  Group_Fee_Wallet,
} from '../../entities';
import {CommonService} from "../../common/common.service";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Group_Apikey)
    private ApiKeyRepository: Repository<Group_Apikey>,
    @InjectRepository(Group_Master_Wallet)
    private MasterWalletRepository: Repository<Group_Master_Wallet>,
    @InjectRepository(Group_Fee_Wallet)
    private FeeWalletRepository: Repository<Group_Fee_Wallet>,
    @InjectRepository(Coin_Address)
    private CoinAddressRepository: Repository<Coin_Address>,
    @InjectRepository(Coin_Address_Register)
    private CoinAddressRegisterRepository: Repository<Coin_Address_Register>,
    @InjectRepository(Group_Master_Purse)
    private GroupMasterPurseRepository: Repository<Group_Master_Purse>,
    @InjectRepository(Group_Fee_Purse)
    private GroupFeePurseRepository: Repository<Group_Fee_Purse>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly commonService: CommonService,
    private readonly etherService: EtherService,
  ) {}

  // Api Key 조회
  async selectApiKey(group_code: string) {
    await this.commonService.selectGroup(group_code);

    const group_Apikey = await this.entityManager
      .createQueryBuilder(Group_Apikey, 'data')
      .select('group_code')
      .addSelect('api_key')
      .addSelect('webhook_href')
      .addSelect('created_at')
      .where('data.group_code = :group_code', { group_code: group_code })
      .getRawMany();

    return group_Apikey;
  }

  // Api Key 생성
  async createApiKey(group_code: string) {
    await this.commonService.selectGroup(group_code);

    const exist_Data = await this.selectApiKey(group_code);
    if (exist_Data.length > 0) return exist_Data;

    const api_key: string = uuid().replaceAll('-', '').substring(0, 20);

    const member_Apikey = new Group_Apikey();
    member_Apikey.group_code = group_code;
    member_Apikey.api_key = api_key;
    member_Apikey.webhook_href = '';
    member_Apikey.created_at = new Date();

    await this.ApiKeyRepository.save(member_Apikey);

    return member_Apikey;
  }

  // WebHook Href 수정
  async updateWebhookHref(group_code: string, webhook_href: string) {
    await this.commonService.selectGroup(group_code);

    const member_Apikey = new Group_Apikey();
    member_Apikey.group_code = group_code;
    member_Apikey.webhook_href = webhook_href;

    await this.ApiKeyRepository.save(member_Apikey);

    const exist_Data = await this.selectApiKey(group_code);
    if (exist_Data.length > 0) return exist_Data;

    return member_Apikey;
  }

  // Master Wallet 조회
  async selectMasterWallet(group_code: string) {
    await this.commonService.selectGroup(group_code);

    const member_MasterWallet = await this.entityManager
      .createQueryBuilder(Group_Master_Wallet, 'mem')
      .select('group_code')
      //.addSelect('network')
      .addSelect('wallet_address')
      .addSelect('created_at')
      .addSelect('updated_at')
      .where('mem.group_code = :group_code', { group_code: group_code })
      .getRawMany();

    return member_MasterWallet;
  }

  // Master Wallet Balance 조회
  async selectMasterWalletBalance(group_code: string) {
    // 그룹 Data 존재 체크
    await this.commonService.selectGroup(group_code);
    // 그룹 자산오류 체크
    await this.commonService.selectMasterPurseError(group_code);

    // Ethereum Ether 자산 체크 후 없으면 생성
    const EtherPurse = await this.GroupMasterPurseRepository.find({
      where: { group_code: group_code, network: 'Ethereum', coin: 'Ether' },
    });

    if (EtherPurse.length == 0) {
      const group_Master_Purse = new Group_Master_Purse();
      group_Master_Purse.group_code = group_code;
      group_Master_Purse.network = 'Ethereum';
      group_Master_Purse.coin = 'Ether';
      group_Master_Purse.coin_amount = 0;
      await this.GroupMasterPurseRepository.save(group_Master_Purse);
    }

    // Polygon Matic 자산 체크 후 없으면 생성
    const MaticPurse = await this.GroupMasterPurseRepository.find({
      where: { group_code: group_code, network: 'Polygon', coin: 'Matic' },
    });

    if (MaticPurse.length == 0) {
      const group_Master_Purse = new Group_Master_Purse();
      group_Master_Purse.group_code = group_code;
      group_Master_Purse.network = 'Polygon';
      group_Master_Purse.coin = 'Matic';
      group_Master_Purse.coin_amount = 0;
      await this.GroupMasterPurseRepository.save(group_Master_Purse);
    }

    const member_MasterWallet_Purse = await this.entityManager
      .createQueryBuilder(Group_Master_Purse, 'gmp')
      .select('group_code')
      .addSelect('network')
      .addSelect('coin')
      .addSelect('coin_amount')
      .where('gmp.group_code = :group_code', { group_code: group_code })
      .getRawMany();

    return member_MasterWallet_Purse;
  }

  // Master Wallet 생성
  async createMasterWallet(group_code: string, network: string = 'Ethereum') {
    await this.commonService.selectGroup(group_code);

    if (network != 'Ethereum' && network != 'Polygon' && network != 'Tron') network = 'Ethereum';

    const member_MasterWallet = await this.entityManager
      .createQueryBuilder(Group_Master_Wallet, 'mem')
      .select('group_code')
      .addSelect('wallet_address')
      .addSelect('created_at')
      .addSelect('updated_at')
      .where('mem.group_code = :group_code', { group_code: group_code })
      .andWhere('mem.network = :network', { network: network })
      .getRawMany();
    if (member_MasterWallet.length > 0) return member_MasterWallet;

    const account = await this.etherService.createAccount();

    const memberMasterWallet = new Group_Master_Wallet();
    memberMasterWallet.group_code = group_code;
    memberMasterWallet.network = network;
    memberMasterWallet.wallet_address = account.address;
    memberMasterWallet.wallet_private_key = this.commonService.encryptAES(account.privateKey);

    await this.MasterWalletRepository.save(memberMasterWallet);

    const exist_Data = await this.selectMasterWallet(group_code);
    if (exist_Data.length > 0) return exist_Data;

    return memberMasterWallet;
  }

  // Fee Wallet 조회
  async selectFeeWallet(group_code: string) {
    await this.commonService.selectGroup(group_code);

    const member_FeeWallet = await this.entityManager
      .createQueryBuilder(Group_Fee_Wallet, 'mem')
      .select('group_code')
      //.addSelect('network')
      .addSelect('wallet_address')
      .addSelect('created_at')
      .addSelect('updated_at')
      .where('mem.group_code = :group_code', { group_code: group_code })
      .getRawMany();

    return member_FeeWallet;
  }

  // Fee Wallet Balance 조회
  async selectFeeWalletBalance(group_code: string) {
    // 그룹 Data 존재 체크
    await this.commonService.selectGroup(group_code);
    // 그룹 자산오류 체크
    await this.commonService.selectFeePurseError(group_code);

    // Ethereum Ether 자산 체크 후 없으면 생성
    const EtherPurse = await this.GroupFeePurseRepository.find({
      where: { group_code: group_code, network: 'Ethereum', coin: 'Ether' },
    });

    if (EtherPurse.length == 0) {
      const group_Fee_Purse = new Group_Fee_Purse();
      group_Fee_Purse.group_code = group_code;
      group_Fee_Purse.network = 'Ethereum';
      group_Fee_Purse.coin = 'Ether';
      group_Fee_Purse.coin_amount = 0;
      await this.GroupFeePurseRepository.save(group_Fee_Purse);
    }

    // Polygon Matic 자산 체크 후 없으면 생성
    const MaticPurse = await this.GroupFeePurseRepository.find({
      where: { group_code: group_code, network: 'Polygon', coin: 'Matic' },
    });

    if (MaticPurse.length == 0) {
      const group_Fee_Purse = new Group_Fee_Purse();
      group_Fee_Purse.group_code = group_code;
      group_Fee_Purse.network = 'Polygon';
      group_Fee_Purse.coin = 'Matic';
      group_Fee_Purse.coin_amount = 0;
      await this.GroupFeePurseRepository.save(group_Fee_Purse);
    }

    const member_FeeWallet_Purse = await this.entityManager
      .createQueryBuilder(Group_Fee_Purse, 'gmp')
      .select('group_code')
      .addSelect('network')
      .addSelect('coin')
      .addSelect('coin_amount')
      .where('gmp.group_code = :group_code', { group_code: group_code })
      .getRawMany();

    return member_FeeWallet_Purse;
  }

  // Fee Wallet 생성
  async createFeeWallet(group_code: string, network: string = 'Ethereum') {
    await this.commonService.selectGroup(group_code);

    if (network != 'Ethereum' && network != 'Polygon' && network != 'Tron') network = 'Ethereum';

    const member_FeeWallet = await this.entityManager
      .createQueryBuilder(Group_Fee_Wallet, 'mem')
      .select('group_code')
      .addSelect('wallet_address')
      .addSelect('created_at')
      .addSelect('updated_at')
      .where('mem.group_code = :group_code', { group_code: group_code })
      .andWhere('mem.network = :network', { network: network })
      .getRawMany();
    if (member_FeeWallet.length > 0) return member_FeeWallet;

    const account = await this.etherService.createAccount();

    const memberFeeWallet = new Group_Fee_Wallet();
    memberFeeWallet.group_code = group_code;
    memberFeeWallet.network = network;
    memberFeeWallet.wallet_address = account.address;
    memberFeeWallet.wallet_private_key = this.commonService.encryptAES(account.privateKey);

    await this.FeeWalletRepository.save(memberFeeWallet);

    const exist_Data = await this.selectFeeWallet(group_code);
    if (exist_Data.length > 0) return exist_Data;

    return memberFeeWallet;
  }

  // Coin Address 획득
  async selectCoinAddress(group_code: string, network: string = 'Ethereum') {
    await this.commonService.selectGroup(group_code);

    const addressData = await this.CoinAddressRepository.findOne({ where: { network: network, group_code: IsNull() } });
    addressData.group_code = group_code;
    addressData.mapped_at = new Date();
    await this.CoinAddressRepository.save(addressData);

    const coin_Address_Register = new Coin_Address_Register();
    coin_Address_Register.address = addressData.address;
    coin_Address_Register.network = network;
    coin_Address_Register.group_code = group_code;
    await this.CoinAddressRegisterRepository.save(coin_Address_Register);

    return addressData;
  }

  // 현재 할당되어 있는 Coin Address List
  async selectCurrentCoinAddress(group_code: string, network: string = 'Ethereum') {
    await this.commonService.selectGroup(group_code);

    const addressData = await this.entityManager
      .createQueryBuilder(Coin_Address, 'ca')
      .select('address')
      .addSelect('mapped_at')
      .where('ca.group_code = :group_code', { group_code: group_code })
      .andWhere('ca.network = :network', { network: network })
      .getRawMany();

    return addressData;
  }

  // 과거 할당되었던 Coin Address List
  async selectRegisteredCoinAddress(group_code: string, network: string = 'Ethereum') {
    await this.commonService.selectGroup(group_code);

    const addressData = await this.entityManager
      .createQueryBuilder(Coin_Address_Register, 'ca')
      .select('ROW_NUMBER () OVER (ORDER BY "id" DESC) as "id"')
      .addSelect('address')
      .addSelect('mapped_at')
      .where('ca.group_code = :group_code', { group_code: group_code })
      .andWhere('ca.network = :network', { network: network })
      .orderBy('id', 'DESC')
      .getRawMany();

    return addressData;
  }

  // 수수료 설정
  async updateDepositFee(ethereum_fee, polygon_fee) {
    const ethereum_deposit_fee = await this.commonService.updateCommonCode('ethereum_deposit_fee', ethereum_fee);
    const polygon_deposit_fee = await this.commonService.updateCommonCode('polygon_deposit_fee', polygon_fee);

    return { ethereum_deposit_fee: ethereum_deposit_fee, polygon_deposit_fee: polygon_deposit_fee };
  }

  // 수수료 설정
  async updateWithdrawFee(ethereum_fee, polygon_fee) {
    const ethereum_withdraw_fee = await this.commonService.updateCommonCode('ethereum_withdraw_fee', ethereum_fee);
    const polygon_withdraw_fee = await this.commonService.updateCommonCode('polygon_withdraw_fee', polygon_fee);

    return { ethereum_withdraw_fee: ethereum_withdraw_fee, polygon_withdraw_fee: polygon_withdraw_fee };
  }

  // 수수료 조회
  async selectDepositFee() {
    const ethereum_deposit_fee = await this.commonService.selectCommonCode('ethereum_deposit_fee');
    const polygon_deposit_fee = await this.commonService.selectCommonCode('polygon_deposit_fee');

    return { ethereum_deposit_fee: ethereum_deposit_fee, polygon_deposit_fee: polygon_deposit_fee };
  }

  // 수수료 조회
  async selectWithdrawtFee() {
    const ethereum_withdraw_fee = await this.commonService.selectCommonCode('ethereum_withdraw_fee');
    const polygon_withdraw_fee = await this.commonService.selectCommonCode('polygon_withdraw_fee');

    return { ethereum_withdraw_fee: ethereum_withdraw_fee, polygon_withdraw_fee: polygon_withdraw_fee };
  }
}
