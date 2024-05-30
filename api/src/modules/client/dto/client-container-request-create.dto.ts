import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClientContainerRequestCreateDto {
  @IsNotEmpty({ message: '코드(code)은 필수값 입니다.' })
  @IsString({ message: '코드(code)의 형식이 올바르지 않습니다.' })
  @Length(1, 30)
  @ApiProperty({ description: '코드' })
  code: string;

  @IsNotEmpty({ message: '이름(name)은 필수값 입니다.' })
  @IsString({ message: '이름(name)의 형식이 올바르지 않습니다.' })
  @Length(1, 50)
  @ApiProperty({ description: '이름' })
  api_key: string;

  @IsNotEmpty({ message: '웹 훅 주소(webhook_url)은 필수값 입니다.' })
  @IsString({ message: '웹 훅 주소(webhook_url)의 형식이 올바르지 않습니다.' })
  @Length(1, 120)
  @ApiProperty({ description: '웹 훅 주소' })
  webhook_url: string;
}
