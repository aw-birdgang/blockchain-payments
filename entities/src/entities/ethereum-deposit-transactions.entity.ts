import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class EthereumDepositTransactions {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Transform((params) => params.value.trim())
  @Column({ length: 66, unique: true })
  txHash: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 42 })
  fromAddress: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 42 })
  toAddress: string;

  @Column()
  blockNumber: number;

  @Column({ length: 10 })
  coin: string;

  @Column({ type: 'decimal', precision: 16, scale: 8, default: 0 })
  amounts: number;

  @Column({ length: 30, nullable: true })
  clientId: string;

  @Column({ length: 50, nullable: true, default: '' })
  blkHash: string;

  @Column({ length: 1, default: 'N' })
  isSended: string;

  @Column({ default: 0 })
  webhookCount: number;

  @Column({ length: 1, default: 'N' })
  webhookSuccess: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
