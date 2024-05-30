import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  //ETHEREUM KLAYTN BITCOIN LITECOIN FILECOIN BINANCE_SMART_CHAIN BITCOIN_CASH POLYGON
  @Column()
  network: string;

  @PrimaryColumn({ length: 44 })
  address: string;

  @PrimaryColumn({ length: 140 })
  private_key: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  //트랜잭션 상태 > ACTIVE CREATING FAILED INACTIVE
  @Column()
  status: string;

  @Column()
  whitelistActivated: string;

  @Column()
  version: string;

  static of(params: Partial<Wallet>): Wallet {
    const wallet = new Wallet();
    Object.assign(wallet, params);
    return wallet;
  }
}
