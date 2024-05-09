import {ApiProperty} from '@nestjs/swagger';
import {Transform} from "class-transformer";

export class ResponseGetDepositAddressDto {
  @ApiProperty({ description: 'ID'})
  @Transform((params) => params.value.trim())
  id: string;

  @ApiProperty({ description: '입금 주소' })
  @Transform((params) => params.value.trim())
  address: string;

  @ApiProperty({ description: '이름' })
  @Transform((params) => params.value.trim())
  name: string;

  //ETHEREUM
  @ApiProperty({ description: '메인넷 종류' })
  @Transform((params) => params.value.trim())
  network: string;

  @ApiProperty({ description: '버전' })
  @Transform((params) => params.value.trim())
  version: string;
}