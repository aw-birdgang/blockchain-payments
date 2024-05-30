import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RequestGetTransferDto {
  @IsNotEmpty({ message: '코인의 기호는 필수 항목 입니다.' })
  @IsString()
  @ApiProperty({ description: '코인의 기호' })
  @Transform((params) => params.value.trim())
  ticker: string;

  @IsNotEmpty({ message: '지갑 ID 는 필수 항목 입니다.' })
  @IsString({ message: '지갑 ID 는 문자열로 작성 하셔야 합니다.' })
  @ApiProperty({
    description: '단일 지갑(혹은 입금 주소)을 조회 하고 싶은 경우, 해당 지갑 ID를 입력 합니다.',
  })
  @Transform((params) => params.value.trim())
  walletId: string;

  @IsNotEmpty({ message: '마스터 지갑 ID 는 필수 항목입니다.' })
  @IsString({ message: '마스터 지갑 ID 는 문자열로 작성 하셔야 합니다.' })
  @ApiProperty({
    description:
      '마스터 지갑 ID (해당 마스터 지갑을 포함 하여 하위의 사용자 지갑 입출금 내역도 함께 조회 합니다.)',
  })
  @Transform((params) => params.value.trim())
  masterWalletId: string;

  @IsNotEmpty({ message: '트랜잭션 ID 는 필수 항목입니다.' })
  @IsString({ message: '트랜잭션 ID 는 문자열로 작성 하셔야 합니다.' })
  @ApiProperty({ description: '트랜잭션 ID' })
  @Transform((params) => params.value.trim())
  transactionId: string;

  @IsNotEmpty({ message: '트랜잭션 해시 는 필수 항목입니다.' })
  @IsString({ message: '트랜잭션 해시 는 문자열로 작성 하셔야 합니다.' })
  @ApiProperty({ description: '트랜잭션 해시' })
  @Transform((params) => params.value.trim())
  transactionHash: string;

  @IsNotEmpty({ message: '트랜잭션 상태 는 필수 항목입니다.' })
  @IsString({ message: '트랜잭션 상태 는 문자열로 작성 하셔야 합니다.' })
  @ApiProperty({ description: '트랜잭션 상태' })
  @Transform((params) => params.value.trim())
  status: string;

  @IsNotEmpty({ message: '트랜잭션의 종류 는 필수 항목입니다.' })
  @IsString({ message: '트랜잭션의 종류 는 문자열로 작성 하셔야 합니다.' })
  @ApiProperty({ description: '트랜잭션의 종류(입금, 출금)' })
  @Transform((params) => params.value.trim())
  transferType: string;
}
