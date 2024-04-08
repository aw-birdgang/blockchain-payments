import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoinAddressRegister {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Transform((params) => params.value.trim())
  @Column({ length: 10 })
  network: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 44 })
  address: string;

  @Column({ length: 30 })
  group_code: string;

  @CreateDateColumn({ type: 'datetime' })
  mapped_at: Date;
}
