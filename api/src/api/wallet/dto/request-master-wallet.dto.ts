import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestMasterWalletDto {
  @IsNotEmpty({ message: '그룹코드는 필수 항목입니다.' })
  @IsString({ message: '문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: '그룹코드', default: 'group_code' })
  group_code: string;

  // @IsNotEmpty({ message: '블록체인 네트워크는 필수 항목입니다.' })
  // @IsString({ message: '블록체인 네트워크는 문자열로 작성하셔야 합니다.' })
  // @ApiProperty({ description: '블록체인 네트워크', default: 'Ethereum' })
  // network: string;
}
