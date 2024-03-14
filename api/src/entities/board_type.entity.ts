import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity({ comment: '게시판 타입' })
export class Board_Type {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 50, comment: '게시판 타입' })
  board_type_code: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 50, comment: '게시판 타입명' })
  board_type_name: string;

  @Column({ length: 1, comment: '게시판 사용여부' })
  use_tag: string;
}
