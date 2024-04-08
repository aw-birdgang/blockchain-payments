// import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
// import { IsEmail } from 'class-validator';
// import { Transform } from 'class-transformer';
// import { BadRequestException } from '@nestjs/common';
// import { ApiProperty } from '@nestjs/swagger';
//
// @Entity()
// export class Member {
//   @Transform((params) => params.value.trim())
//   @ApiProperty({
//     example: 'Charles Lee',
//     description: '사용자 아이디',
//     required: true,
//   })
//   @PrimaryColumn({ length: 30 })
//   member_id: string;
//
//   @Transform(({ value, obj }) => {
//     if (obj.user_pass.includes(obj.name.trim())) {
//       throw new BadRequestException('password는 id와 같은 문자열을 포함할 수 없습니다.');
//     }
//     return value.trim();
//   })
//   @ApiProperty({
//     example: 'qwert12345',
//     description: '사용자 비밀번호',
//     required: true,
//   })
//   @Column({ length: 100 })
//   member_pass: string;
//
//   @Column({ length: 30 })
//   member_name: string;
//
//   @IsEmail()
//   @ApiProperty({
//     example: 'charles@test.com',
//     description: '사용자 이메일',
//     required: true,
//   })
//   @Column({ length: 50 })
//   email: string;
//
//   @Column({ length: 30 })
//   group_code: string;
//
//   @Column({ length: 1 })
//   member_type: string;
//
//   @CreateDateColumn({ type: 'datetime' })
//   created_at: Date;
//
//   @UpdateDateColumn({ type: 'datetime' })
//   updated_at: Date;
// }
