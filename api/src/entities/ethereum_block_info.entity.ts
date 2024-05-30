// "number": 3,
//     "hash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
//     "parentHash": "0x2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
//     "baseFeePerGas": 58713056622,
//     "nonce": "0xfb6e1a62d119228b",
//     "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
//     "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
//     "transactionsRoot": "0x3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
//     "stateRoot": "0xf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
//     "miner": "0x8888f1f195afa192cfee860698584c030f4c9db1",
//     "difficulty": '21345678965432',
//     "totalDifficulty": '324567845321',
//     "size": 616,
//     "extraData": "0x",
//     "gasLimit": 3141592,
//     "gasUsed": 21662,
//     "timestamp": 1429287689,
//     "transactions": [
//     "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
// ],
//     "uncles": []

import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
//
// @Entity()
// export class BlockInfo extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;
//
//     @Column()
//     @ApiProperty({ description: '번호' })
//     number: number;
//
//     // @Column('text')
//     // @ApiProperty({ description: '해시' })
//     // hash: string;
//     //
//     // @Column('bigint')
//     // @ApiProperty({ description: '블록 생성 시간' })
//     // timestamp: number;
//     //
//     // @Column()
//     // @ApiProperty({ description: '트랜 잭션 수' })
//     // transactionCount: number;
//     //
//     // @Column('jsonb', { nullable: true })
//     // @ApiProperty({ description: '트랜 잭션' })
//     // transactions: string[]; // Optional, stores an array of transaction hashes
//
//     @CreateDateColumn()
//     createdAt: Date;
//
//     static of(params: Partial<BlockInfo>): BlockInfo {
//         const blockInfo = new BlockInfo();
//         Object.assign(blockInfo, params);
//         return blockInfo;
//     }
//
// }

@Entity()
export class BlockInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  // @Column('text')
  // @ApiProperty({ description: '해시' })
  // hash: string;
  //
  // @Column('bigint')
  // @ApiProperty({ description: '블록 생성 시간' })
  // timestamp: number;
  //
  // @Column()
  // @ApiProperty({ description: '트랜 잭션 수' })
  // transactionCount: number;
  //
  // @Column('jsonb', { nullable: true })
  // @ApiProperty({ description: '트랜 잭션' })
  // transactions: string[]; // Optional, stores an array of transaction hashes

  @CreateDateColumn()
  checkedAt: Date;
}
