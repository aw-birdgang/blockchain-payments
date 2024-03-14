import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member_Login_Fail {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 30 })
  member_id: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}
