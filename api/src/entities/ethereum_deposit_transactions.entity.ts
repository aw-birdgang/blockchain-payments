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
  txhash: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 42 })
  from_address: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 42 })
  to_address: string;

  @Column()
  block_number: number;

  @Column({ length: 10 })
  coin: string;

  @Column({ type: 'decimal', precision: 16, scale: 8, default: 0 })
  amounts: number;

  @Column({ length: 30, nullable: true })
  clientId: string;

  @Column({ length: 50, nullable: true, default: '' })
  blkhash: string;

  @Column({ length: 1, default: 'N' })
  is_sended: string;

  @Column({ default: 0 })
  webhook_count: number;

  @Column({ length: 1, default: 'N' })
  webhook_success: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
