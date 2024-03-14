import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Market_Ticker {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 20 })
  exchange: string;

  @PrimaryColumn({ length: 10 })
  symbol: string;

  @Column({ type: 'double', precision: 16, scale: 8, default: 0 })
  ticker: number;

  @Column({ type: 'double', precision: 8, scale: 3, default: 0 })
  ticker_percent: string;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
