// import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
// import { Transform } from 'class-transformer';
//
// @Entity({ comment: '게시판 내용' })
// export class Board_Content {
//   @Transform((params) => params.value.trim())
//   @PrimaryColumn({ length: 50, comment: '게시판 아이디' })
//   board_id: string;
//
//   @PrimaryColumn({ type: 'bigint', comment: '게시판 번호' })
//   board_idx: number;
//
//   @PrimaryColumn({ comment: '게시판 서브 번호' })
//   board_subidx: number;
//
//   @Column({ length: 200, comment: '게시판 제목' })
//   board_subject: string;
//
//   @Column({ type: 'text', comment: '게시판 내용' })
//   board_contents: string;
//
//   @Column({ length: 10, nullable: true, comment: '게시판 공지' })
//   notice: string;
//
//   @Column({ type: 'bigint', comment: '회원 번호' })
//   member_id: number;
//
//   @Column({ nullable: true, comment: '읽은 횟수' })
//   hit: number;
//
//   @Column({ length: 200, nullable: true, comment: '파일명1' })
//   file1: string;
//
//   @Column({ length: 200, nullable: true, comment: '파일명2' })
//   file2: string;
//
//   @Column({ length: 200, nullable: true, comment: '파일명3' })
//   file3: string;
//
//   @Column({ length: 200, nullable: true, comment: '파일명4' })
//   file4: string;
//
//   @Column({ length: 200, nullable: true, comment: '파일명5' })
//   file5: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목1' })
//   wr1: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목2' })
//   wr2: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목3' })
//   wr3: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목4' })
//   wr4: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목5' })
//   wr5: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목6' })
//   wr6: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목7' })
//   wr7: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목8' })
//   wr8: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목9' })
//   wr9: string;
//
//   @Column({ length: 200, nullable: true, comment: '임시항목10' })
//   wr10: string;
//
//   @CreateDateColumn({ type: 'datetime', comment: '작성일시' })
//   created_at: Date;
// }
