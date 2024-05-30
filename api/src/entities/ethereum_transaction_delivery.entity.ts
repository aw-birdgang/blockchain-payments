import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class EthereumTransactionDelivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionHash: string;

  @Column()
  blockHash: string;

  @Column()
  blockNumber: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  value: string;

  @Column('bigint')
  gasUsed: number;

  @Column('decimal', { precision: 20, scale: 0 })
  gasPrice: number;

  @Column()
  contractAddress: string;

  @Column()
  status: boolean;

  @Column()
  delivered: string;

  @Column()
  priority: number;

  @Column()
  clientId: string;

  @CreateDateColumn()
  timestamp: Date;
}
