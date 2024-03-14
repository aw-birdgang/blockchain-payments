import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Coin_Trade_Fee {
  @PrimaryColumn()
  transaction_no: number;

  @PrimaryColumn({ length: 10 })
  coin: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 10 })
  network: string;

  @Column({ type: 'bigint' })
  fees: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
