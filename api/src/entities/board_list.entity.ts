// import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
// import { Transform } from 'class-transformer';
//
// @Entity({ comment: '게시판 목록' })
// export class Board_List {
//   @Transform((params) => params.value.trim())
//   @PrimaryColumn({ length: 50, comment: '게시판 아이디' })
//   board_id: string;
//
//   @Column({ length: 100, comment: '게시판 제목' })
//   board_subject: string;
//
//   @Column({ length: 100, comment: '게시판 내용' })
//   board_contents: string;
//
//   @Column({ length: 10, comment: '게시판 읽기권한' })
//   read_level: string;
//
//   @Column({ length: 10, comment: '게시판 쓰기권한' })
//   write_level: string;
//
//   @Column({ length: 10, comment: '게시판 목록권한' })
//   list_level: string;
//
//   @Column({ length: 10, comment: '게시판 댓글권한' })
//   reply_level: string;
//
//   @Column({ length: 10, comment: '게시판 업로드권한' })
//   upload_level: string;
//
//   @Column({ length: 10, comment: '게시판 다운로드권한' })
//   download_level: string;
//
//   @Column({ length: 10, comment: '게시판 테이블 길이' })
//   table_width: string;
//
//   @Column({ length: 50, comment: '게시판 제목 길이' })
//   subject_len: string;
//
//   @Column({ length: 10, comment: '게시판 표시줄수' })
//   page_rows: string;
//
//   @Column({ comment: '게시판 업로드 파일 개수' })
//   upload_count: number;
//
//   @Column({ comment: '게시판 업로드 파일 사이즈' })
//   upload_size: number;
//
//   @Column({ comment: '게시판 이미지 개수' })
//   image_count: number;
//
//   @Column({ comment: '게시판 이미지 사이즈' })
//   image_width: number;
//
//   @Column({ length: 10, comment: '게시판 타입' })
//   board_type_code: string;
//
//   @Column({ length: 10, comment: '게시판 New 표시' })
//   display_new: string;
//
//   @Column({ length: 10, comment: '게시판 Hot 표시' })
//   display_hot: string;
//
//   @CreateDateColumn({ type: 'datetime', comment: '생성일시' })
//   created_at: Date;
// }
