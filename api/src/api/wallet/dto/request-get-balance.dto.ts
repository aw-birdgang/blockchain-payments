import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Transform} from "class-transformer";

export class RequestGetWalletDto {
  @IsNotEmpty({ message: '지갑 ID 는 필수 항목 입니다.' })
  @IsString({ message: '지갑 ID 는 문자열 로 작성 하셔야 합니다.' })
  @ApiProperty({ description: '단일 지갑(혹은 입금 주소)을 조회 하고 싶은 경우, 해당 지갑 ID를 입력 합니다.'})
  @Transform((params) => params.value.trim())
  walletId: string;

  @IsNotEmpty({ message: '코인의 기호' })
  @IsString({ message: '코인의 기호' })
  @ApiProperty({ description: '코인의 기호' })
  @Transform((params) => params.value.trim())
  ticker: string;

}