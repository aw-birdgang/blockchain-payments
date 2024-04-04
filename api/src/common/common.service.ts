import {BadRequestException, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, DataSource } from 'typeorm';
import * as crypto from 'crypto';

// Entities
import {
  Member,
  Group_Info,
  Group_Master_Purse,
  Group_Master_Purse_History,
  Group_Fee_Purse,
  Group_Fee_Purse_History,
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

  // 회원 선택
  async selectMember(member_id: string) {
    const memberData = await this.entityManager
      .createQueryBuilder(Member, 'mem')
      .leftJoinAndSelect(Group_Info, 'grp', 'mem.group_code = grp.group_code')
      .select('mem.member_id', 'member_id')
      .addSelect('mem.member_name', 'member_name')
      .addSelect('mem.member_type', 'member_type')
      .addSelect('mem.email', 'email')
      .addSelect('mem.group_code', 'group_code')
      .addSelect('grp.group_name', 'group_name')
      .where('mem.member_id = :member_id', { member_id: member_id })
      .getRawMany();

    if (memberData.length == 0) throw new BadRequestException('Member ID is invalid. [' + member_id + ']');

    return memberData;
  }

  // 그룹 선택
  async selectGroup(group_code: string) {
    const groupData = await this.entityManager
      .createQueryBuilder(Group_Info, 'data')
      .select('group_code')
      .select('group_name')
      .where('data.group_code = :group_code', { group_code: group_code })
      .getRawMany();

    if (groupData.length == 0) throw new BadRequestException('Group code is invalid. [' + group_code + ']');

    return groupData;
  }

  // ===== 마스터 지갑 =====

  // 마스터 지갑 오류 체크
  async selectMasterPurseError2(group_code: string) {
    const errorData = await this.entityManager.query(
      `
  SELECT gmp.group_code,
      gmp.network,
      gmp.coin,
         COALESCE(gmp.coin_amount, 0) - COALESCE(b.t, 0) AS gap,
         COALESCE(gmp.coin_amount, 0)                    AS purse,
         COALESCE(b.t, 0)                                AS history
  FROM   group_master_purse gmp
         LEFT JOIN
                ( SELECT  gmph.group_code,
                         gmph.network,
                         gmph.coin,
                         COALESCE(SUM(gmph.coin_in_amount - gmph.coin_out_amount), 0) AS t
                FROM     group_master_purse_history gmph
                WHERE    gmph.group_code = "${group_code}"
                GROUP BY gmph.group_code, gmph.network, gmph.coin
                )
                b
         ON     gmp.group_code         = b.group_code
  WHERE  gmp.group_code                = "${group_code}"
  AND gmp.network = b.network
 AND gmp.coin = b.coin
  AND COALESCE(gmp.coin_amount, 0) <> COALESCE(b.t, 0);
    `,
    );
    return errorData;
  }

  // 마스터 지갑 오류 체크
  async selectMasterPurseError(group_code: string) {
    const errorData = await this.entityManager
      .createQueryBuilder(Group_Master_Purse, 'gmp')
      .select('gmp.group_code', 'group_code')
      .addSelect('gmp.network', 'network')
      .addSelect('gmp.coin', 'coin')
      .addSelect('COALESCE(gmp.coin_amount, 0) - COALESCE(subQuery.t, 0)', 'gap')
      .addSelect('COALESCE(gmp.coin_amount, 0)', 'purse')
      .addSelect('COALESCE(subQuery.t, 0)', 'history')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .from(Group_Master_Purse_History, 'gmph')
            .select('gmph.group_code', 'group_code')
            .addSelect('gmph.network', 'network')
            .addSelect('gmph.coin', 'coin')
            .addSelect('COALESCE(SUM(gmph.coin_in_amount - gmph.coin_out_amount), 0)', 't')
            .where('gmph.group_code = :group_code', { group_code })
            .groupBy('gmph.group_code, gmph.network, gmph.coin');
        },
        'subQuery',
        'gmp.group_code = subQuery.group_code',
      )
      .where('gmp.group_code = :group_code', { group_code })
      .andWhere('gmp.network = subQuery.network')
      .andWhere('gmp.coin = subQuery.coin')
      .andWhere('COALESCE(gmp.coin_amount, 0) <> COALESCE(subQuery.t, 0)');

    const errData = await errorData.getRawMany();

    if (errData.length > 0) {
      throw new InternalServerErrorException('Purse Balance Error');
    }

    return errData;

    // 아래 쿼리를 entityManager로 만듦
    // SELECT gmp.group_code,
    //     gmp.network,
    //     gmp.coin,
    //        COALESCE(gmp.coin_amount, 0) - COALESCE(b.t, 0) AS gap,
    //        COALESCE(gmp.coin_amount, 0)                    AS purse,
    //        COALESCE(b.t, 0)                                AS history
    // FROM   group_master_purse gmp
    //        LEFT JOIN
    //               ( SELECT  gmph.group_code,
    //                        gmph.network,
    //                        gmph.coin,
    //                        COALESCE(SUM(gmph.coin_in_amount - gmph.coin_out_amount), 0) AS t
    //               FROM     group_master_purse_history gmph
    //               WHERE    gmph.group_code = '12345678-12345678'
    //               GROUP BY gmph.group_code, gmph.network, gmph.coin
    //               )
    //               b
    //        ON     gmp.group_code         = b.group_code
    // WHERE  gmp.group_code                = '12345678-12345678'
    // AND gmp.network = b.network
    // AND gmp.coin = b.coin
    // AND COALESCE(gmp.coin_amount, 0) <> COALESCE(b.t, 0);
  }

  // 마스터 지갑 입금 처리
  async deposit_master_purse(
    group_code: string,
    network: string = 'Ethereum',
    coin: string = 'Ether',
    coin_amount: number = 0,
    txhash: string = '',
    memo: string = '',
  ) {
    // 지갑 오류 체크
    await this.selectMasterPurseError(group_code);

    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction('REPEATABLE READ');

    let result: boolean = false;

    try {
      // 지갑 업데이트(없으면 생성)
      const group_purse = await queryRunner.manager.findOneBy(Group_Master_Purse, { group_code: group_code, network: network, coin: coin });

      if (group_purse == null) {
        const create_group_purse = await queryRunner.manager.create(Group_Master_Purse, {
          group_code: group_code,
          network: network,
          coin: coin,
          coin_amount: coin_amount * Math.pow(10, 8),
        });

        await queryRunner.manager.save(create_group_purse);
      } else {
        const update_group_purse = await queryRunner.manager.create(Group_Master_Purse, {
          group_code: group_code,
          network: network,
          coin: coin,
          coin_amount: Number(group_purse.coin_amount) + Number(coin_amount) * Math.pow(10, 8),
        });

        await queryRunner.manager.save(update_group_purse);
      }

      // 입출금 내역 저장
      const create_group_purse_history = await queryRunner.manager.create(Group_Master_Purse_History, {
        group_code: group_code,
        network: network,
        coin: coin,
        coin_in_amount: Number(coin_amount) >= 0 ? Number(coin_amount) * Math.pow(10, 8) : 0,
        coin_out_amount: Number(coin_amount) < 0 ? -1 * Number(coin_amount) * Math.pow(10, 8) : 0,
        blk_type: Number(coin_amount) >= 0 ? 'D' : 'W',
        txhash: txhash,
        memo: memo,
      });

      await queryRunner.manager.save(create_group_purse_history);

      // commit transaction now:
      await queryRunner.commitTransaction();
      result = true;
    } catch (err) {
      // since we have errors let's rollback changes we made
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
      return result;
    }
  }

  // ===== 수수료 지갑 =====

  /**
   * 수수료지갑 조회
   */
  async getFeePurse(group_code: string, network: string, coin: string) {
    const purseData = await this.entityManager
      .createQueryBuilder(Group_Fee_Purse, 'gmp')
      .select('gmp.coin_amount / 100000000', 'coin_amount')
      .where('gmp.group_code = :group_code', { group_code })
      .andWhere('gmp.network = :network', { network })
      .andWhere('gmp.coin = :coin', { coin })
      .getRawMany();

    if (purseData.length == 0) {
      return 0;
    }

    return Number(purseData[0].coin_amount);
  }

  // Fee 지갑 오류 체크
  async selectFeePurseError(group_code: string) {
    const errorData = await this.entityManager
      .createQueryBuilder(Group_Fee_Purse, 'gmp')
      .select('gmp.group_code', 'group_code')
      .addSelect('gmp.network', 'network')
      .addSelect('gmp.coin', 'coin')
      .addSelect('COALESCE(gmp.coin_amount, 0) - COALESCE(subQuery.t, 0)', 'gap')
      .addSelect('COALESCE(gmp.coin_amount, 0)', 'purse')
      .addSelect('COALESCE(subQuery.t, 0)', 'history')
      .leftJoin(
        (subQuery) => {
          return subQuery
            .from(Group_Fee_Purse_History, 'gmph')
            .select('gmph.group_code', 'group_code')
            .addSelect('gmph.network', 'network')
            .addSelect('gmph.coin', 'coin')
            .addSelect('COALESCE(SUM(gmph.coin_in_amount - gmph.coin_out_amount), 0)', 't')
            .where('gmph.group_code = :group_code', { group_code })
            .groupBy('gmph.group_code, gmph.network, gmph.coin');
        },
        'subQuery',
        'gmp.group_code = subQuery.group_code',
      )
      .where('gmp.group_code = :group_code', { group_code })
      .andWhere('gmp.network = subQuery.network')
      .andWhere('gmp.coin = subQuery.coin')
      .andWhere('COALESCE(gmp.coin_amount, 0) <> COALESCE(subQuery.t, 0)');

    const errData = await errorData.getRawMany();

    if (errData.length > 0) {
      throw new InternalServerErrorException('Purse Balance Error');
    }

    return errData;
  }

  // 수수료 지갑 입금 처리
  async deposit_fee_purse(
    group_code: string,
    network: string = 'Ethereum',
    coin: string = 'Ether',
    coin_amount: number = 0,
    txhash: string = '',
    memo: string = '',
  ) {
    // 지갑 오류 체크
    await this.selectFeePurseError(group_code);

    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction('REPEATABLE READ');

    let result: boolean = false;

    try {
      // 지갑 업데이트(없으면 생성)
      const group_purse = await queryRunner.manager.findOneBy(Group_Fee_Purse, { group_code: group_code, network: network, coin: coin });

      if (group_purse == null) {
        const create_group_purse = await queryRunner.manager.create(Group_Fee_Purse, {
          group_code: group_code,
          network: network,
          coin: coin,
          coin_amount: coin_amount * Math.pow(10, 8),
        });

        await queryRunner.manager.save(create_group_purse);
      } else {
        const update_group_purse = await queryRunner.manager.create(Group_Fee_Purse, {
          group_code: group_code,
          network: network,
          coin: coin,
          coin_amount: Number(group_purse.coin_amount) + Number(coin_amount) * Math.pow(10, 8),
        });

        await queryRunner.manager.save(update_group_purse);
      }

      // 입출금 내역 저장
      const create_group_purse_history = await queryRunner.manager.create(Group_Fee_Purse_History, {
        group_code: group_code,
        network: network,
        coin: coin,
        coin_in_amount: Number(coin_amount) >= 0 ? Number(coin_amount) * Math.pow(10, 8) : 0,
        coin_out_amount: Number(coin_amount) < 0 ? -1 * Number(coin_amount) * Math.pow(10, 8) : 0,
        blk_type: Number(coin_amount) >= 0 ? 'D' : 'W',
        txhash: txhash,
        memo: memo,
      });

      await queryRunner.manager.save(create_group_purse_history);

      // commit transaction now:
      await queryRunner.commitTransaction();
      result = true;
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
      return result;
    }
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
