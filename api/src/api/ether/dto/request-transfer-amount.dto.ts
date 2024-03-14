import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferAmountDto {
  @IsNotEmpty({ message: '전송 속도는 필수 항목입니다.' })
  @IsNumber()
  @ApiProperty({ description: '전송 속도', default: 1 })
  speed: number;

  @IsNotEmpty({ message: '전송 Address는 필수 항목입니다.' })
  @IsString({ message: '전송 Address는 문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: '전송 Address', default: '0x0000000000' })
  toAddress: string;

  @IsNotEmpty({ message: 'private_key는 필수 항목입니다.' })
  @IsString({ message: 'private_key는 문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: 'private key', default: '0x0000000000' })
  private_key: string;

  @IsNotEmpty({ message: '전송량은 필수 항목입니다.' })
  @ApiProperty({ description: '전송량' })
  amount: number;
}
