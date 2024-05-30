import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class EthereumTransactionInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  hash: string;

  @Column()
  blockNumber: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column('decimal', { precision: 20, scale: 0 })
  value: string; // 금액은 문자열로 저장하여 큰 숫자를 처리

  @Column()
  gasUsed: number;

  @Column()
  gasPrice: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ default: false })
  success: boolean;
}
