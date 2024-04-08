import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CoinAddress {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 10 })
  network: string;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 44 })
  address: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 140 })
  private_key: string;

  @Column({ length: 30, nullable: true })
  group_code: string;

  @Column({ type: 'datetime', nullable: true })
  mapped_at: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
