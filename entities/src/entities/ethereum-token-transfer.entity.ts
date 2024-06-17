import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EthereumTokenTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column('bigint')
  value: string;

  @Column()
  tokenAddress: string;

  @Column()
  blockNumber: number;
}
