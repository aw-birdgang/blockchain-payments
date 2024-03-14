import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestFeeDto {
  @IsNotEmpty({ message: '이더리움 수수료는 필수 항목입니다.' })
  @IsNumber()
  @ApiProperty({ description: '이더리움 수수료', default: '0.005' })
  ethereum_fee: number;

  @IsNotEmpty({ message: '폴리곤 수수료는 필수 항목입니다.' })
  @IsNumber()
  @ApiProperty({ description: '폴리곤 수수료', default: '0.5' })
  polygon_fee: number;
}
