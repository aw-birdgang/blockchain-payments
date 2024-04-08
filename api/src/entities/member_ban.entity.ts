// import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Transform } from 'class-transformer';
//
// @Entity()
// export class Member_Ban {
//   @PrimaryGeneratedColumn({ type: 'bigint' })
//   id: number;
//
//   @Column({ length: 30 })
//   member_id: string;
//
//   @Transform((params) => params.value.trim())
//   @Column({ length: 44 })
//   ip_address: string;
//
//   @Column({ type: 'text' })
//   memo: string;
//
//   @CreateDateColumn({ type: 'datetime' })
//   created_at: Date;
// }
