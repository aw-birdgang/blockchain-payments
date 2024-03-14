import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity({ comment: '게시판 댓글' })
export class Board_Reply {
  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 50, comment: '게시판 아이디' })
  board_id: string;

  @PrimaryColumn({ type: 'bigint', comment: '게시판 번호' })
  board_idx: number;

  @PrimaryColumn({ comment: '게시판 서브 번호' })
  board_subidx: number;

  @Column({ comment: '게시판 댓글 번호' })
  reply_idx: number;

  @Column({ comment: '게시판 서브 댓글 번호' })
  reply_subidx: number;

  @Column({ type: 'text', comment: '댓글 내용' })
  reply_contents: string;

  @Column({ type: 'bigint', comment: '회원 번호' })
  member_id: number;

  @CreateDateColumn({ type: 'datetime', comment: '작성일시' })
  created_at: Date;
}
