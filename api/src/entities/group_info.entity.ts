import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Group_Info {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 30 })
  group_code: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 30 })
  group_name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
