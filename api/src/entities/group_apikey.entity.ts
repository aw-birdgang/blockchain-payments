import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class GroupApikey {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 30 })
  group_code: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 50 })
  api_key: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 120 })
  webhook_href: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
