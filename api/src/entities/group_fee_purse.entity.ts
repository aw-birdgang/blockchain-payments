import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Group_Fee_Purse {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 30 })
  group_code: string;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 10 })
  network: string;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 10 })
  coin: string;

  @Column({ type: 'bigint' })
  coin_amount: number;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}

@Entity()
export class Group_Fee_Purse_History {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Transform((params) => params.value.trim())
  @Column({ length: 10 })
  network: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 10 })
  coin: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 30 })
  group_code: string;

  @Column({ type: 'bigint' })
  coin_in_amount: number;

  @Column({ type: 'bigint' })
  coin_out_amount: number;

  @Column({ length: 5 })
  blk_type: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 66, nullable: true, default: '' })
  txhash: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 100, nullable: true })
  memo: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
