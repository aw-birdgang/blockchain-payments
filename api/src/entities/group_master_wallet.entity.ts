import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class GroupMasterWallet {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 30 })
  group_code: string;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 10 })
  network: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 44 })
  wallet_address: string;

  @Column({ length: 140 })
  wallet_private_key: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
