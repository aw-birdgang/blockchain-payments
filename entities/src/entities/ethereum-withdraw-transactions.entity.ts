import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Ethereum_Withdraw_Transactions {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Transform((params) => params.value.trim())
  @Column({ length: 66, unique: true })
  txHash: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 42 })
  toAddress: string;

  @Column({ type: 'double', precision: 3, scale: 2, default: 0 })
  speed: number;

  @Column({ length: 10 })
  coin: string;

  @Column({ length: 30, nullable: true })
  clientCode: string;

  @Column({ type: 'decimal', precision: 16, scale: 8, default: 0 })
  amounts: number;

  @Column({ length: 50, nullable: true, default: '' })
  blkHash: string;

  @Column({ type: 'decimal', precision: 12, scale: 8, default: 0 })
  fee: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
