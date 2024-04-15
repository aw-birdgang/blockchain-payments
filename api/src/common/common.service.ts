import {BadRequestException, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, DataSource } from 'typeorm';
import * as crypto from 'crypto';

// Entities
import {
  Client,
  Common_Code,
} from '../entities';
import {ConfigService} from "../config";

@Injectable()
export class CommonService {

  private readonly logger = new Logger(CommonService.name);

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService
  ) {}

  // === Encrypt ===

  ENCRYPTION_KEY = 'qwertyuiopasdfgh'.repeat(2); // Must be 256 bits (32 characters)
  IV_LENGTH = 16; // For AES, this is always 16

  encrypt(text) {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    const encrypted = cipher.update(text);

    return iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex');
  }

  decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
  }

  encryptAES(text) {
    const cipher = crypto.createCipheriv('aes-256-ecb', this.ENCRYPTION_KEY, '');
    let result = cipher.update(text, 'utf8', 'base64');
    result += cipher.final('base64');

    return result;
  }

  decryptAES(text) {
    const cipher = crypto.createDecipheriv('aes-256-ecb', this.ENCRYPTION_KEY, '');
    let result = cipher.update(text, 'base64', 'utf8');
    result += cipher.final('utf8');

    return result;
  }

  // ===== 회원 / 그룹 선택 =====
  // 그룹 선택
  async selectGroup(client_code: string) {
    const groupData = await this.entityManager
      .createQueryBuilder(Client, 'data')
      .select('client_code')
      .select('group_name')
      .where('data.client_code = :client_code', { client_code: client_code })
      .getRawMany();

    if (groupData.length == 0) throw new BadRequestException('Group code is invalid. [' + client_code + ']');

    return groupData;
  }


  // ===== ERC20 =====

  // Ethereum ERC20 Token List
  getEthereumTokens() {
    const usdtContract = this.configService.get("USDT_ETHEREUM_TOKEN_CONTRACT");
    const usdcContract = this.configService.get("USDC_ETHEREUM_TOKEN_CONTRACT");
    this.logger.log("usdtContract : " + usdtContract);
    this.logger.log("usdcContract : " + usdcContract);

    return [
      {
        symbol: 'USDT',usdtContract,
        decimals: 6,
        balance: 0,
      },
      {
        symbol: 'USDC',
        contractAddress: usdcContract,
        decimals: 6,
        balance: 0,
      },
    ];
  }

  // Polygon ERC20 Token List
  getPolygonTokens() {
    return [
      {
        symbol: 'USDT',
        contractAddress: process.env.USDT_Polygon_Token_Contract,
        decimals: 6,
        balance: 0,
      },
      {
        symbol: 'USDC',
        contractAddress: process.env.USDC_Polygon_Token_Contract,
        decimals: 6,
        balance: 0,
      },
    ];
  }

  async selectCommonCode(code_index: string) {
    const commoncodeData = await this.entityManager
      .createQueryBuilder(Common_Code, 'cc')
      .select('cc.code_index', 'code_index')
      .addSelect('cc.code_value', 'code_value')
      .where('cc.code_index = :code_index', { code_index: code_index })
      .getRawMany();

    if (commoncodeData.length >= 1) {
      return commoncodeData[0].code_value;
    } else {
      await this.entityManager
        .createQueryBuilder()
        .insert()
        .into(Common_Code)
        .values([{ code_index: code_index, code_value: '0' }])
        .execute();
      return '0';
    }
  }

  async updateCommonCode(code_index: string, code_value: string) {
    const commoncodeData = await this.entityManager
      .createQueryBuilder(Common_Code, 'cc')
      .select('cc.code_index', 'code_index')
      .addSelect('cc.code_value', 'code_value')
      .where('cc.code_index = :code_index', { code_index: code_index })
      .getRawMany();

    if (commoncodeData.length >= 1) {
      await this.entityManager
        .createQueryBuilder()
        .update(Common_Code)
        .set({ code_value: code_value })
        .where('code_index = :code_index', { code_index: code_index })
        .execute();
      return code_value;
    } else {
      await this.entityManager
        .createQueryBuilder()
        .insert()
        .into(Common_Code)
        .values([{ code_index: code_index, code_value: code_value }])
        .execute();
      return code_value;
    }
  }

  // ===== Etc =====

  // sleep 함수
  sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
}
