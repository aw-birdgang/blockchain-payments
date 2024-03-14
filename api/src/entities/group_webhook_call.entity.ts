import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group_Webhook_Call {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Transform((params) => params.value.trim())
  @Column({ length: 10 })
  network: string;

  @Column({ type: 'bigint' })
  deposit_id: number;

  @Column({ length: 120 })
  webhook_url: string;

  @Column({ length: 20, nullable: true, default: '' })
  res_status: string;

  @Column({ length: 1000, nullable: true, default: '' })
  res_message: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
