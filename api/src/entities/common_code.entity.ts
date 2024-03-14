import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity({ comment: 'Common Code' })
export class Common_Code {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 30, comment: '코드 인덱스' })
  code_index: string;

  @Column({ length: 100, comment: '코드 값' })
  code_value: string;

  @Column({ length: 100, nullable: true, default: '', comment: '임시항목1' })
  code_temp1: string;

  @Column({ length: 100, nullable: true, default: '', comment: '임시항목2' })
  code_temp2: string;

  @Column({ length: 100, nullable: true, default: '', comment: '임시항목3' })
  code_temp3: string;

  @Column({ length: 100, nullable: true, default: '', comment: '임시항목4' })
  code_temp4: string;

  @Column({ length: 100, nullable: true, default: '', comment: '임시항목5' })
  code_temp5: string;

  @CreateDateColumn({ type: 'datetime', comment: '생성일시' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '수정일시' })
  updated_at: Date;
}
