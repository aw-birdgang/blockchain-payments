import {ApiProperty} from '@nestjs/swagger';
import {Transform} from "class-transformer";

export class ResponseGetWalletDto {
  @ApiProperty({ description: '코인 ID' })
  @Transform((params) => params.value.trim())
  coinId: number;

  @ApiProperty({ description: '확정된 잔액' })
  @Transform((params) => params.value.trim())
  amount: string;

  @ApiProperty({ description: '출금 가능한 잔액' })
  @Transform((params) => params.value.trim())
  spendableAmount: string;

  @ApiProperty({ description: '이름' })
  @Transform((params) => params.value.trim())
  name: string;

  @ApiProperty({ description: '코인의 기호' })
  @Transform((params) => params.value.trim())
  ticker: string;

  @ApiProperty({ description: '코인의 소수점 자릿수' })
  @Transform((params) => params.value.trim())
  decimals: string;

}