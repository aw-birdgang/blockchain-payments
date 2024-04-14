import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestUserIDWebHookDto {
  @IsNotEmpty({ message: '그룹코드는 필수 항목입니다.' })
  @IsString({ message: '문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: '그룹코드', default: 'client_code' })
  client_code: string;

  @IsNotEmpty({ message: 'Webhook는 필수 항목입니다.' })
  @IsString({ message: 'Webhook는 문자열로 작성하셔야 합니다.' })
  @ApiProperty({ description: 'Webhook', default: 'Webhook Href' })
  WebhookHref: string;
}
