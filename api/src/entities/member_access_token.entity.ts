import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Member_Access_Token {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 30 })
  member_id: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 50 })
  access_token: string;

  @Column({ type: 'datetime' })
  token_expire: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
