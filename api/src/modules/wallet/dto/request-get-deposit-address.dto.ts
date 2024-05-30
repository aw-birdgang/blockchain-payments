import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RequestGetDepositAddressDto {
  @IsNotEmpty({ message: '지갑 ID 는 필수 항목 입니다.' })
  @IsString({ message: '지갑 ID 는 문자열 로 작성 하셔야 합니다.' })
  @ApiProperty({ description: '지갑 ID 를 입력 합니다.' })
  @Transform((params) => params.value.trim())
  walletId: string;

  @IsString({ message: '이름' })
  @ApiProperty({ description: '이름' })
  @Transform((params) => params.value.trim())
  name: string;

  @IsString({ message: '입금 주소' })
  @ApiProperty({ description: '입금 주소' })
  @Transform((params) => params.value.trim())
  address: string;
}
